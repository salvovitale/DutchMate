import { Injectable } from '@angular/core';
import { VerbInput } from '../wordInput.module';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Verb, KindWord } from '../word.module';
import { take, switchMap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

interface VerbData {
    word: string;
    translations: string[];
    kind: KindWord;
    examples: string;
    auxVerb: string;
    isRegular: boolean;
    firstAdded: string;
    lastUpdated: string;
    lastTimePracticed: string,
    knowledgeStrength: number;
}

@Injectable({
  providedIn: 'root'
})
export class VerbsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addVerb(verbDataInput: VerbInput){
    let separatedTranslation = verbDataInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
    let fetchedToken : string;
    let newVerb: Verb;
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
          newVerb = new Verb(
            Math.random().toString(),
            verbDataInput.word,
            separatedTranslation,
            KindWord.Verb,
            verbDataInput.examples,
            verbDataInput.auxVerb,
            verbDataInput.isRegular,
            new Date(),
            new Date(),
            new Date(),
            0
          )
          return this.http.post<{name: string}>(
            `${environment.databaseUrl}/${userId}/verbs.json?auth=${fetchedToken}`,
            {...newVerb, id: null}
          )
        }
      ),
      switchMap(
        resData =>{
          newVerb.id = resData.name;
          return of(newVerb);
        }
      )
    )
  }

  fetchVerbs(){
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
          return this.http.get<{[key: string]:VerbData}>(
            `${environment.databaseUrl}/${fetchedUserId}/verbs.json?auth=${token}`
          )
        }
      ),
      switchMap(
        resData =>{
          const verbs = [];
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              let lastTimePracticed: Date;
              if(resData[key].lastTimePracticed){
                lastTimePracticed = new Date(resData[key].lastTimePracticed);
              } else {
                lastTimePracticed = new Date(resData[key].firstAdded);
              }
              verbs.push(new  Verb(
                key,
                resData[key].word,
                resData[key].translations,
                +resData[key].kind,
                resData[key].examples,
                resData[key].auxVerb,
                resData[key].isRegular,
                new Date(resData[key].firstAdded),
                new Date(resData[key].lastUpdated),
                lastTimePracticed,
                +resData[key].knowledgeStrength,
              ));
            }
          }
          return of(verbs);
        }
      )
    )
  }

  deleteVerb(id: string){
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
            `${environment.databaseUrl}/${fetchedUserId}/verbs/${id}.json?auth=${token}`
          );
        }
      )
    );
  }

  getVerb(id: string) {
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
          return this.http.get<VerbData>(
            `${environment.databaseUrl}/${fetchedUserId}/verbs/${id}.json?auth=${token}`,
          )
        }
      ),
      map(
        verbData =>{
          return new Verb(
            id,
            verbData.word,
            verbData.translations,
            +verbData.kind,
            verbData.examples,
            verbData.auxVerb,
            verbData.isRegular,
            new Date(verbData.firstAdded),
            new Date(verbData.lastUpdated),
            new Date(verbData.lastTimePracticed),
            +verbData.knowledgeStrength
          )
        }
      )
    )
  }

  updateVerb(id: string, verbInput: VerbInput){
    let separatedTranslation = verbInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
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
          return this.getVerb(id);
        }
      ),
      switchMap(
        oldVerb => {
          let updatedVerb = new Verb(
            id,
            verbInput.word,
            separatedTranslation,
            KindWord.Verb,
            verbInput.examples,
            verbInput.auxVerb,
            verbInput.isRegular,
            oldVerb.firstAdded,
            new Date(),
            oldVerb.lastTimePracticed,
            oldVerb.knowledgeStrength
          );
          return this.http.put(
            `${environment.databaseUrl}/${fetchedUserId}/verbs/${id}.json?auth=${fetchedToken}`,
            {...updatedVerb, id: null}
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
          return this.getVerb(id);
        }
      ),
      switchMap(
        verb => {
          return this.http.put(
            `${environment.databaseUrl}/${fetchedUserId}/verbs/${id}.json?auth=${fetchedToken}`,
            {
              ...verb,
              id: null,
              knowledgeStrength: verb.knowledgeStrength + value,
              lastTimePracticed: new Date()
            }
          )
        }
      )
    )
  }
}
