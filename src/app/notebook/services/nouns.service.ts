import { Injectable } from '@angular/core';
import { Noun, KindWord } from '../word.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { take, tap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NounInput } from '../wordInput.module';

interface NounData {
  userId: string,
  word: string,
  plural: string,
  translations: string[],
  hetDe: string,
  kind: string,
  examples: string,
  firstAdded: string,
  lastUpdated: string,
  knowledgeStrength: number
}

@Injectable({
  providedIn: 'root'
})
export class NounsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
              ) { }

  addNoun(nounDataInput: NounInput){
    let separatedTranslation = nounDataInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
    let generatedId : string;
    let newNoun: Noun;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId =>{
          newNoun = new Noun(
            Math.random().toString(),
            userId,
            nounDataInput.word,
            separatedTranslation,
            KindWord.Noun,
            nounDataInput.examples,
            nounDataInput.hetDe,
            nounDataInput.plural,
            new Date(),
            new Date(),
            0
          )
          return this.http.post<{name: string}>(
            `${environment.databaseUrl}/nouns.json`,
            {...newNoun, id: null}
          )
        }
      ),
      switchMap(
        resData =>{
          newNoun.id = resData.name;
          return of(newNoun);
        }
      )
    )
  }

  fetchNouns(){
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          return this.http.get<{[key: string]:NounData}>(
            `${environment.databaseUrl}/nouns.json?orderBy="userId"&equalTo="${userId}"`
          )
        }
      ),
      switchMap(
        resData =>{
          const nouns = [];
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              nouns.push(new  Noun(
                key,
                resData[key].userId,
                resData[key].word,
                resData[key].translations,
                +resData[key].kind,
                resData[key].examples,
                resData[key].hetDe,
                resData[key].plural,
                new Date(resData[key].firstAdded),
                new Date(resData[key].lastUpdated),
                +resData[key].knowledgeStrength,
              ));
            }
          }
          return of(nouns);
        }
      )
    )  
  }

  deleteNoun(id: string){
    return this.http.delete(
      `${environment.databaseUrl}/nouns/${id}.json`
    )
  }

  getNoun(id: string) {
    return this.http.get<NounData>(
      `${environment.databaseUrl}/nouns/${id}.json`,  
    ).pipe(
      map(
        nounData =>{
          return new Noun(
            id,
            nounData.userId,
            nounData.word,
            nounData.translations,
            +nounData.kind,
            nounData.examples,
            nounData.hetDe,
            nounData.plural,
            new Date(nounData.firstAdded),
            new Date(nounData.lastUpdated),
            +nounData.knowledgeStrength
          )
        }
      ) 
    )
  }

  updateNoun(id: string,
             word: string,
             translations: string,
             hetDe: string,
             plural: string, 
             examples: string,
             )
  {
    let separatedTranslation = translations.split(',').map(s => s.trim()).filter(el => el !== ''); 
    return this.getNoun(id).pipe(
      switchMap(
        oldNoun => {
          let updatedNoun = new Noun(
            id,
            oldNoun.userId,
            word,
            separatedTranslation,
            KindWord.Noun,
            examples,
            hetDe,
            plural,
            oldNoun.firstAdded,
            new Date(),
            oldNoun.knowledgeStrength
          )
          return this.http.put(
            `${environment.databaseUrl}/nouns/${id}.json`,
                {...updatedNoun, id: null}  
          )  
        }
      )
    )          
  }
}
