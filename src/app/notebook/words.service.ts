import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noun, KindWord, Word, Verb } from './word.module';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay, map, switchMap } from 'rxjs/operators';
import { NounsService } from './services/nouns.service';
import { Router } from '@angular/router';
import { NounInput, VerbInput } from './wordInput.module';
import { VerbsService } from './services/verbs.service';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private _words = new BehaviorSubject<Word[]>([]);

  constructor(
    private http: HttpClient,
    private nounsService: NounsService,
    private verbsService: VerbsService,
    private router: Router) { }

  get words(){
    return this._words.asObservable();
  }

  addNoun(nounDataInput: NounInput){
    return this.nounsService.addNoun(nounDataInput).pipe(
      switchMap(
        newNoun => {
          return this.words.pipe(
            take(1),
            tap(
              words => {
                this._words.next(words.concat(newNoun));
                this.router.navigate(['/','tabs','notebook','nouns', newNoun.id]);
              }
            )
          )
        }
      )
    )
  }

  deleteNoun(id: string){
    return this.nounsService.deleteNoun(id).pipe(
      switchMap(
        () => {
          return this.words;
        }
      ),
      take(1),
      tap(
        words =>{
          this._words.next(words.filter(word => word.id !== id));
        }
      )
    )
  }

  addVerb(verbDataInput: VerbInput){
    return this.verbsService.addVerb(verbDataInput).pipe(
      switchMap(
        newVerb => {
          return this.words.pipe(
            take(1),
            tap(
              words => {
                this._words.next(words.concat(newVerb));
                // this.router.navigate(['/','tabs','notebook','nouns', newNoun.id]);
              }
            )
          )
        }
      )
    )
  }

  deleteVerb(id: string){
    return this.verbsService.deleteVerb(id).pipe(
      switchMap(
        () => {
          return this.words;
        }
      ),
      take(1),
      tap(
        words =>{
          this._words.next(words.filter(word => word.id !== id));
        }
      )
    )
  }

  fetchWords(){
    let fetchedNouns = []
    return this.nounsService.fetchNouns().pipe(
      switchMap(
        nouns => {
          fetchedNouns = nouns;
          return this.verbsService.fetchVerbs();
        }
      ),
      tap(
        verbs =>{
          this._words.next(fetchedNouns.concat(verbs).sort((a,b) => (a.word > b.word) ? 1 : ((b.word > a.word) ? -1 : 0)));
        }
      )
    )
  }
}
