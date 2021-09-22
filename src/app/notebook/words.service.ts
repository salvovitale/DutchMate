import { Injectable } from '@angular/core';
import { KindWord, Word } from './word.module';
import { BehaviorSubject } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';
import { NounsService } from './services/nouns.service';
import { Router } from '@angular/router';
import { NounInput, VerbInput, WordInput } from './wordInput.module';
import { VerbsService } from './services/verbs.service';
import { OtherWordsService } from './services/other-words.service';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private _words = new BehaviorSubject<Word[]>([]);

  constructor(
    private nounsService: NounsService,
    private verbsService: VerbsService,
    private otherWordsService: OtherWordsService,
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
                // this.router.navigate(['/','tabs','notebook','nouns', newNoun.id]);
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

  addWord(wordInput: WordInput){
    return this.otherWordsService.addOtherWord(wordInput).pipe(
      switchMap(
        newWord => {
          return this.words.pipe(
            take(1),
            tap(
              words => {
                this._words.next(words.concat(newWord));
                // this.router.navigate(['/','tabs','notebook','nouns', newNoun.id]);
              }
            )
          )
        }
      )
    )
  }

  deleteWord(id: string){
    return this.otherWordsService.deleteOtherWord(id).pipe(
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
    let fetchedOtherWords = [];
    return this.nounsService.fetchNouns().pipe(
      switchMap(
        nouns => {
          fetchedNouns = nouns;
          return this.otherWordsService.fetchOtherWords();
        }
      ),
      switchMap(
        otherWords => {
          fetchedOtherWords = otherWords;
          return this.verbsService.fetchVerbs();
        }
      ),
      tap(
        verbs =>{
          this._words.next(fetchedNouns
            .concat(fetchedOtherWords)
            .concat(verbs)
            .sort((a,b) => (a.word > b.word) ? 1 : ((b.word > a.word) ? -1 : 0)));
        }
      )
    )
  }

  updateKnowledgeStrength(id: string, value: number, kind: KindWord){
    switch (kind) {
      case KindWord.Noun:
        return this.nounsService.updateKnowledgeStrength(id, value);
      case KindWord.Verb:
        return this.verbsService.updateKnowledgeStrength(id, value);
      default:
        return this.otherWordsService.updateKnowledgeStrength(id, value);
    }
  }

}
