import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import {Plugins, Capacitor} from '@capacitor/core'
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _authSub: Subscription;
  private previousState = false;
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router

  ) {
    this.initializeApp();
  }
  ngOnDestroy(): void {
    if(this._authSub){
      this._authSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._authSub = this.authService.userIsAuthenticated.subscribe(
      isAuth=>{
        if(!isAuth && this.previousState !== isAuth){
          this.router.navigateByUrl('/auth');
        }
        this.previousState = isAuth;
      }
    )
  }

  initializeApp() {
    // console.log(this.platform.is('web'));
    this.platform.ready().then(() => {
      if(Capacitor.isPluginAvailable('SplashScreen')){
        Plugins.SplashScreen.hide();
      }
    });
  }

  onLogOut(){
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}