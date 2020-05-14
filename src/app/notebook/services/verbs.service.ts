import { Injectable } from '@angular/core';
import { VerbInput } from '../wordInput.module';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Verb, KindWord } from '../word.module';
import { take, switchMap } from 'rxjs/operators';
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
            verbDataInput.firstPersonPastPlural,
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
}
