import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { AdjectiveInput } from '../wordInput.module';
import { take, switchMap, map } from 'rxjs/operators';
import { Adjective, KindWord } from '../word.module';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

interface AdjectiveData {
  userId: string;
  word: string;
  translations: string[];
  kind: KindWord;
  examples: string;
  eForm: string,
  isAlsoAdverb: boolean,
  adverbTranslations: string[],
  firstAdded: Date;
  lastUpdated: Date;
  knowledgeStrength: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdjectivesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addAdjective(adjectiveDataInput: AdjectiveInput){
    let separatedTranslations = adjectiveDataInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
    let separatedAdverbTranslations = [''];
    if(adjectiveDataInput.adverbTranslations && adjectiveDataInput.adverbTranslations.length > 0){
      separatedAdverbTranslations = adjectiveDataInput.adverbTranslations.split(',').map(s => s.trim()).filter(el => el !== '');
    }
    let fetchedToken : string;
    let newAdjective: Adjective;
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
          newAdjective = new Adjective(
            Math.random().toString(),
            userId,
            adjectiveDataInput.word,
            separatedTranslations,
            KindWord.Adjective,
            adjectiveDataInput.examples,
            adjectiveDataInput.eForm,
            adjectiveDataInput.isAlsoAdverb,
            separatedAdverbTranslations,
            new Date(),
            new Date(),
            0
          )
          return this.http.post<{name: string}>(
            `${environment.databaseUrl}/adjectives.json?auth=${fetchedToken}`,
            {...newAdjective, id: null}
          )
        }
      ),
      switchMap(
        resData =>{
          newAdjective.id = resData.name;
          return of(newAdjective);
        }
      )
    )
  }

  fetchAdjectives(){
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
          return this.http.get<{[key: string]:AdjectiveData}>(
            `${environment.databaseUrl}/adjectives.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
          )
        }
      ),
      switchMap(
        resData =>{
          const adjectives = [];
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              adjectives.push(new  Adjective(
                key,
                resData[key].userId,
                resData[key].word,
                resData[key].translations,
                +resData[key].kind,
                resData[key].examples,
                resData[key].eForm,
                resData[key].isAlsoAdverb,
                resData[key].adverbTranslations,
                new Date(resData[key].firstAdded),
                new Date(resData[key].lastUpdated),
                +resData[key].knowledgeStrength,
              ));
            }
          }
          return of(adjectives);
        }
      )
    )
  }

  getAdjective(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(
        token => {
          return this.http.get<AdjectiveData>(
            `${environment.databaseUrl}/adjectives/${id}.json?auth=${token}`
          )
        }
      ),
      map(
        adjectiveData =>{
          return new Adjective(
            id,
            adjectiveData.userId,
            adjectiveData.word,
            adjectiveData.translations,
            +adjectiveData.kind,
            adjectiveData.examples,
            adjectiveData.eForm,
            adjectiveData.isAlsoAdverb,
            adjectiveData.adverbTranslations,
            new Date(adjectiveData.firstAdded),
            new Date(adjectiveData.lastUpdated),
            +adjectiveData.knowledgeStrength
          )
        }
      )
    )
  }

  deleteAdjective(id: string){
    return this.authService.token.pipe(
      take(1),
      switchMap(
        token => {
          return this.http.delete(
            `${environment.databaseUrl}/adjectives/${id}.json?auth=${token}`
          );
        }
      )
    );
  }
}
