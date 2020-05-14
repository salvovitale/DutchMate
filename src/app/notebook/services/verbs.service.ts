import { Injectable } from '@angular/core';
import { VerbInput } from '../wordInput.module';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Verb, KindWord } from '../word.module';
import { take, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

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
}
