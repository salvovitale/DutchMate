import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { AdverbInput } from '../wordInput.module';
import { Adverb, KindWord } from '../word.module';
import { take, switchMap } from 'rxjs/operators';
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
    return this.authService.userId.pipe(
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
            `${environment.databaseUrl}/adverbs.json`,
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
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          return this.http.get<{[key: string]:AdverbData}>(
            `${environment.databaseUrl}/adverbs.json?orderBy="userId"&equalTo="${userId}"`
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
}
