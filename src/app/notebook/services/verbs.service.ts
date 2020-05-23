import { Injectable } from '@angular/core';
import { VerbInput } from '../wordInput.module';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Verb, KindWord } from '../word.module';
import { take, switchMap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

interface VerbData {
    userId: string;
    word: string;
    translations: string[];
    kind: KindWord;
    examples: string;
    firstPersonPresent: string;
    firstPersonPastSingular: string;
    firstPersonPastPlural: string;
    pastParticiple: string;
    auxVerb: string;
    isRegular: boolean;
    firstAdded: Date;
    lastUpdated: Date;
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
    let generatedId : string;
    let newVerb: Verb;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId =>{
          newVerb = new Verb(
            Math.random().toString(),
            userId,
            verbDataInput.word,
            separatedTranslation,
            KindWord.Verb,
            verbDataInput.examples,
            verbDataInput.firstPersonPresent,
            verbDataInput.firstPersonPastSingular,
            verbDataInput.firstPersonPastPlural,
            verbDataInput.pastParticiple,
            verbDataInput.auxVerb,
            verbDataInput.isRegular,
            new Date(),
            new Date(),
            0
          )
          return this.http.post<{name: string}>(
            `${environment.databaseUrl}/verbs.json`,
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
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          return this.http.get<{[key: string]:VerbData}>(
            `${environment.databaseUrl}/verbs.json?orderBy="userId"&equalTo="${userId}"`
          )
        }
      ),
      switchMap(
        resData =>{
          const verbs = [];
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              verbs.push(new  Verb(
                key,
                resData[key].userId,
                resData[key].word,
                resData[key].translations,
                +resData[key].kind,
                resData[key].examples,
                resData[key].firstPersonPresent,
                resData[key].firstPersonPastSingular,
                resData[key].firstPersonPastPlural,
                resData[key].pastParticiple,
                resData[key].auxVerb,
                resData[key].isRegular,
                new Date(resData[key].firstAdded),
                new Date(resData[key].lastUpdated),
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
    return this.http.delete(
      `${environment.databaseUrl}/verbs/${id}.json`
    )
  }

  getVerb(id: string) {
    return this.http.get<VerbData>(
      `${environment.databaseUrl}/verbs/${id}.json`,
    ).pipe(
      map(
        verbData =>{
          return new Verb(
            id,
            verbData.userId,
            verbData.word,
            verbData.translations,
            +verbData.kind,
            verbData.examples,
            verbData.firstPersonPresent,
            verbData.firstPersonPastSingular,
            verbData.firstPersonPastPlural,
            verbData.pastParticiple,
            verbData.auxVerb,
            verbData.isRegular,
            new Date(verbData.firstAdded),
            new Date(verbData.lastUpdated),
            +verbData.knowledgeStrength
          )
        }
      )
    )
  }

  updateVerb(id: string, verbInput: VerbInput){
    let separatedTranslation = verbInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
    return this.getVerb(id).pipe(
      switchMap(
        oldVerb => {
          let updatedVerb = new Verb(
            id,
            oldVerb.userId,
            verbInput.word,
            separatedTranslation,
            KindWord.Verb,
            verbInput.examples,
            verbInput.firstPersonPresent,
            verbInput.firstPersonPastSingular,
            verbInput.firstPersonPastPlural,
            verbInput.pastParticiple,
            verbInput.auxVerb,
            verbInput.isRegular,
            oldVerb.firstAdded,
            new Date(),
            oldVerb.knowledgeStrength
          );
          return this.http.put(
            `${environment.databaseUrl}/verbs/${id}.json`,
            {...updatedVerb, id: null}
          )
        }
      )
    )
  }

}
