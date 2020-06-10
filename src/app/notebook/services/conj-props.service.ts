import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { WordInput } from '../wordInput.module';
import { Word, KindWord } from '../word.module';
import { take, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

interface ConjPropData {
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
export class ConjPropsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addConjProp(conjPropDataInput: WordInput){
    let separatedTranslations = conjPropDataInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
    let newConjProp: Word;
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
          newConjProp = new Word(
            Math.random().toString(),
            userId,
            conjPropDataInput.word,
            separatedTranslations,
            conjPropDataInput.kind,
            conjPropDataInput.examples,
            new Date(),
            new Date(),
            0
          )
          return this.http.post<{name: string}>(
            `${environment.databaseUrl}/conj-props.json?auth=${fetchedToken}`,
            {...newConjProp, id: null}
          )
        }
      ),
      switchMap(
        resData =>{
          newConjProp.id = resData.name;
          return of(newConjProp);
        }
      )
    )
  }

  fetchConjProps(){
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
          return this.http.get<{[key: string]:ConjPropData}>(
            `${environment.databaseUrl}/conj-props.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
          )
        }
      ),
      switchMap(
        resData =>{
          const conjProps = [];
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              conjProps.push(new  Word(
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
          return of(conjProps);
        }
      )
    )
  }
}
