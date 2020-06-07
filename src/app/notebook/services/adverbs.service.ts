import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { AdverbInput } from '../wordInput.module';
import { Adverb, KindWord } from '../word.module';
import { take, switchMap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

interface AdverbData {
  userId: string;
  word: string;
  translations: string[];
  kind: KindWord;
  examples: string;
  firstAdded: Date;
  lastUpdated: Date;
  knowledgeStrength: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdverbsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addAdverb(adjectiveDataInput: AdverbInput){
    let separatedTranslations = adjectiveDataInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
    let newAdverb: Adverb;
    let fetchedToken : string;
    return this.authService.token.pipe(
      take(1),
      switchMap(
        token => {
          fetchedToken = token;
          return this.authService.userId;
        }
      ),
      take(1),
      switchMap(
        userId =>{
          newAdverb = new Adverb(
            Math.random().toString(),
            userId,
            adjectiveDataInput.word,
            separatedTranslations,
            KindWord.Adverb,
            adjectiveDataInput.examples,
            new Date(),
            new Date(),
            0
          )
          return this.http.post<{name: string}>(
            `${environment.databaseUrl}/adverbs.json?auth=${fetchedToken}`,
            {...newAdverb, id: null}
          )
        }
      ),
      switchMap(
        resData =>{
          newAdverb.id = resData.name;
          return of(newAdverb);
        }
      )
    )
  }

  fetchAdverbs(){
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      switchMap(
        token =>{
          return this.http.get<{[key: string]:AdverbData}>(
            `${environment.databaseUrl}/adverbs.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
          )
        }
      ),
      switchMap(
        resData =>{
          const adverbs = [];
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              adverbs.push(new  Adverb(
                key,
                resData[key].userId,
                resData[key].word,
                resData[key].translations,
                +resData[key].kind,
                resData[key].examples,
                new Date(resData[key].firstAdded),
                new Date(resData[key].lastUpdated),
                +resData[key].knowledgeStrength,
              ));
            }
          }
          return of(adverbs);
        }
      )
    )
  }

  getAdverb(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(
        token => {
          return this.http.get<AdverbData>(
            `${environment.databaseUrl}/adverbs/${id}.json?auth=${token}`
          )
        }
      ),
      map(
        adjectiveData =>{
          return new Adverb(
            id,
            adjectiveData.userId,
            adjectiveData.word,
            adjectiveData.translations,
            +adjectiveData.kind,
            adjectiveData.examples,
            new Date(adjectiveData.firstAdded),
            new Date(adjectiveData.lastUpdated),
            +adjectiveData.knowledgeStrength
          )
        }
      )
    )
  }

  deleteAdverb(id: string){
    return this.authService.token.pipe(
      take(1),
      switchMap(
        token => {
          return this.http.delete(
            `${environment.databaseUrl}/adverbs/${id}.json?auth=${token}`
          );
        }
      )
    );
  }

  updateAdverb(id: string, adverbInput: AdverbInput){
    let separatedTranslation = adverbInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
    let fetchedToken: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(
        token => {
          fetchedToken = token;
          return this.getAdverb(id);
        }
      ),
      switchMap(
        oldAdverb => {
          let updatedAdverb = new Adverb(
            id,
            oldAdverb.userId,
            adverbInput.word,
            separatedTranslation,
            adverbInput.kind,
            adverbInput.examples,
            oldAdverb.firstAdded,
            new Date(),
            oldAdverb.knowledgeStrength
          );
          return this.http.put(
            `${environment.databaseUrl}/adverbs/${id}.json?auth=${fetchedToken}`,
                {...updatedAdverb, id: null}
          )
        }
      )
    )
  }
}
