import { Injectable } from '@angular/core';
import { Noun, KindWord } from '../word.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { take, tap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { NounInput } from '../wordInput.module';

interface NounData {
  word: string;
  translations: string[];
  hetDe: string;
  kind: string;
  examples: string;
  firstAdded: string;
  lastUpdated: string;
  lastTimePracticed: string;
  knowledgeStrength: number;
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
    let fetchedToken : string;
    let newNoun: Noun;
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
          newNoun = new Noun(
            Math.random().toString(),
            nounDataInput.word,
            separatedTranslation,
            KindWord.Noun,
            nounDataInput.examples,
            nounDataInput.hetDe,
            new Date(),
            new Date(),
            new Date(),
            0
          )
          return this.http.post<{name: string}>(
            `${environment.databaseUrl}/${userId}/nouns.json?auth=${fetchedToken}`,
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
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      take(1),
      switchMap(
        token =>{
          return this.http.get<{[key: string]:NounData}>(
            `${environment.databaseUrl}/${fetchedUserId}/nouns.json?auth=${token}`
          )
        }
      ),
      switchMap(
        resData =>{
          const nouns = [];
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              let lastTimePracticed: Date;
              if(resData[key].lastTimePracticed){
                lastTimePracticed = new Date(resData[key].lastTimePracticed);
              } else {
                lastTimePracticed = new Date(resData[key].firstAdded);
              }
              nouns.push(new  Noun(
                key,
                resData[key].word,
                resData[key].translations,
                +resData[key].kind,
                resData[key].examples,
                resData[key].hetDe,
                new Date(resData[key].firstAdded),
                new Date(resData[key].lastUpdated),
                lastTimePracticed,
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
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      take(1),
      switchMap(
        token => {
          return this.http.delete(
            `${environment.databaseUrl}/${fetchedUserId}/nouns/${id}.json?auth=${token}`
          );
        }
      )
    );
  }

  getNoun(id: string) {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      take(1),
      switchMap(
        token => {
          return this.http.get<NounData>(
            `${environment.databaseUrl}/${fetchedUserId}/nouns/${id}.json?auth=${token}`
          )
        }
      ),
      map(
        nounData =>{
          return new Noun(
            id,
            nounData.word,
            nounData.translations,
            +nounData.kind,
            nounData.examples,
            nounData.hetDe,
            new Date(nounData.firstAdded),
            new Date(nounData.lastUpdated),
            new Date(nounData.lastTimePracticed),
            +nounData.knowledgeStrength
          )
        }
      )
    )
  }

  updateNoun(id: string, nounInput: NounInput){
    let separatedTranslation = nounInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
    let fetchedToken: string;
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      take(1),
      switchMap(
        token => {
          fetchedToken = token;
          return this.getNoun(id);
        }
      ),
      switchMap(
        oldNoun => {
          let updatedNoun = new Noun(
            id,
            nounInput.word,
            separatedTranslation,
            KindWord.Noun,
            nounInput.examples,
            nounInput.hetDe,
            oldNoun.firstAdded,
            new Date(),
            oldNoun.lastTimePracticed,
            oldNoun.knowledgeStrength
          );
          return this.http.put(
            `${environment.databaseUrl}/${fetchedUserId}/nouns/${id}.json?auth=${fetchedToken}`,
                {...updatedNoun, id: null}
          )
        }
      )
    )
  }

  updateKnowledgeStrength(id: string, value: number){
    let fetchedToken: string;
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      take(1),
      switchMap(
        token => {
          fetchedToken = token;
          return this.getNoun(id);
        }
      ),
      switchMap(
        noun => {
          return this.http.put(
            `${environment.databaseUrl}/${fetchedUserId}/nouns/${id}.json?auth=${fetchedToken}`,
            {
              ...noun,
              id: null,
              knowledgeStrength: noun.knowledgeStrength + value,
              lastTimePracticed: new Date()
            }
          )
        }
      )
    )
  }
}
