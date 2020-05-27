import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core'

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered? : boolean //optional only  returned with login
}

export interface RefreshTokenResponseData {
  expires_in: string,
  token_type: string,
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private activeRefreshTokenTimer : any;

  get userIsAuthenticated(){
    return this._user.asObservable().pipe(map(user =>
    {
      if(user){
        return !!user.token
      } else {
        return false;
      }
    }));
  }

  get userId(){
    return this._user.asObservable().pipe(map(user =>
    {
      if(user){
        return user.id;
      } else {
        return null;
      }
    }));
  }

  get token(){
    return this._user.asObservable().pipe(map(user =>
    {
      if(user){
        return user.token;
      } else {
        return null;
      }
    }));
  }

  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    if(this.activeRefreshTokenTimer){
      clearTimeout(this.activeRefreshTokenTimer);
    }
  }

  autoLogin(){
   return from(Plugins.Storage.get({key: environment.authDataStoreKey}))
      .pipe(
        map(
          storeData => {
            return this.retrieveUserFromLocalStorage(storeData)
          }
        ),
        map(
          user=>{
            if(user && user.token && user.timeToRefreshToken > 0){
              this._user.next(user);
              // console.log(user);
              this.setAutoTokenRefresh(user.timeToRefreshToken);
              return user;
            } else {
              if(this.activeRefreshTokenTimer){
                clearTimeout(this.activeRefreshTokenTimer);
              }
              console.log('refreshing token is not possible anymore');
              this._user.next(null);
              Plugins.Storage.remove({key: environment.authDataStoreKey});
              return null;
            }
          }
        ),
        map(
          // we return true if we have a user or otherwise the null will be converted to false
          user=>{
            return !!user;
          }
        )
      );
  }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>(
      `${environment.signUpUrl}?key=${environment.firebaseAPIKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(tap(this.setUserData.bind(this)));
  }

  logIn(email: string, password: string){
    return this.http.post<AuthResponseData>(
      `${environment.signInUrl}?key=${environment.firebaseAPIKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(tap(this.setUserData.bind(this)));
  }

  logout(){
    if(this.activeRefreshTokenTimer){
      clearTimeout(this.activeRefreshTokenTimer);
    }
    // I need to clear my data in the local storage
    this._user.next(null);
    Plugins.Storage.remove({key: environment.authDataStoreKey});
  }

  sendPasswordResetEmail(email: string){
    return this.http.post<{email: string}>(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.firebaseAPIKey}`,
      {
        requestType: "PASSWORD_RESET",
        email: email
      }
    );
  }

  autoRefreshToken(){
    let retrievedUser: User;
    return from(Plugins.Storage.get({key: environment.authDataStoreKey}))
       .pipe(
         map(
           storeData => {
             return this.retrieveUserFromLocalStorage(storeData)
           }
         ),
         switchMap(
           user=>{
             if(user){
              retrievedUser = user;
              return this.http.post<RefreshTokenResponseData>(
                `https://securetoken.googleapis.com/v1/token?key=${environment.firebaseAPIKey}`,
                {
                  grant_type: "refresh_token",
                  refresh_token: user.refreshToken
                }
              );
             }
           }
         ),
         tap(
           // we return true if we have a user or otherwise the null will be converted to false
           refreshRespData=>{
            const newExpirationTime = new Date(new Date().getTime() + (+refreshRespData.expires_in*1000));
            const refreshedUser = new User(
              retrievedUser.id,
              retrievedUser.email,
              refreshRespData.id_token,
              refreshRespData.refresh_token,
              newExpirationTime
            );
            // console.log(refreshedUser);
            this._user.next(refreshedUser);
            this.setAutoTokenRefresh(refreshedUser.timeToRefreshToken);
            this.storeAuthData(refreshedUser, newExpirationTime.toISOString())
           }
         )
       );
   }

  private setUserData(userData: AuthResponseData){
    const expirationTime = new Date(new Date().getTime() + (+userData.expiresIn*1000));
    const user = new User(
      userData.localId,
      userData.email,
      userData.idToken,
      userData.refreshToken,
      expirationTime
    );
    this._user.next(user);
    this.setAutoTokenRefresh(user.timeToRefreshToken);
    this.storeAuthData(user, expirationTime.toISOString())
  }

  private storeAuthData(user: User, expirationTime: string) {
    const data = JSON.stringify(
      {
        userId: user.id,
        email: user.email,
        token: user.token,
        refreshToken: user.refreshToken,
        tokenExpirationDate: expirationTime
      }
    );
    Plugins.Storage.set({key: environment.authDataStoreKey, value: data})
  }

  private retrieveUserFromLocalStorage(storeData): User {
    if (!storeData || !storeData.value) {
      return null;
    }
    const parsedData = JSON.parse(storeData.value) as {
      userId: string;
      email: string;
      token: string;
      refreshToken: string;
      tokenExpirationDate: string;
    };
    const expirationTime = new Date(parsedData.tokenExpirationDate);
    if (expirationTime <= new Date()) {
      return null;
    }
    const user = new User(parsedData.userId, parsedData.email, parsedData.token, parsedData.refreshToken, expirationTime);
    return user;
  }

  private setAutoTokenRefresh(duration: number){
    if(this.activeRefreshTokenTimer){
      clearTimeout(this.activeRefreshTokenTimer);
    }
    console.log('Set token refresh in: ' + duration);
    this.activeRefreshTokenTimer = setTimeout(()=>{
      this.autoRefreshToken().subscribe();
    }, duration)
  }
}