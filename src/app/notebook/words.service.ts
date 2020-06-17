import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noun, KindWord, Word, Verb } from './word.module';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay, map, switchMap } from 'rxjs/operators';
import { NounsService } from './services/nouns.service';
import { Router } from '@angular/router';
import { NounInput, VerbInput, AdjectiveInput, AdverbInput, WordInput } from './wordInput.module';
import { VerbsService } from './services/verbs.service';
import { AdjectivesService } from './services/adjectives.service';
import { AdverbsService } from './services/adverbs.service';
import { ConjPropsService } from './services/conj-props.service';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private _words = new BehaviorSubject<Word[]>([]);

  constructor(
    private http: HttpClient,
    private nounsService: NounsService,
    private verbsService: VerbsService,
    private adjectivesService: AdjectivesService,
    private adverbsService: AdverbsService,
    private conjPropsService: ConjPropsService,
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

  addAdjective(adjectiveDataInput: AdjectiveInput){
    return this.adjectivesService.addAdjective(adjectiveDataInput).pipe(
      switchMap(
        newAdjective => {
          return this.words.pipe(
            take(1),
            tap(
              words => {
                this._words.next(words.concat(newAdjective));
                // this.router.navigate(['/','tabs','notebook','nouns', newNoun.id]);
              }
            )
          )
        }
      )
    )
  }

  deleteAdjective(id: string){
    return this.adjectivesService.deleteAdjective(id).pipe(
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

  addAdverb(adverbDataInput: AdverbInput){
    return this.adverbsService.addAdverb(adverbDataInput).pipe(
      switchMap(
        newAdverb => {
          return this.words.pipe(
            take(1),
            tap(
              words => {
                this._words.next(words.concat(newAdverb));
                // this.router.navigate(['/','tabs','notebook','nouns', newNoun.id]);
              }
            )
          )
        }
      )
    )
  }

  deleteAdverb(id: string){
    return this.adverbsService.deleteAdverb(id).pipe(
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

  addConjProp(conjPropInput: WordInput){
    return this.conjPropsService.addConjProp(conjPropInput).pipe(
      switchMap(
        newConjProp => {
          return this.words.pipe(
            take(1),
            tap(
              words => {
                this._words.next(words.concat(newConjProp));
                // this.router.navigate(['/','tabs','notebook','nouns', newNoun.id]);
              }
            )
          )
        }
      )
    )
  }

  deleteConjProp(id: string){
    return this.conjPropsService.deleteConjProp(id).pipe(
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
    let fetchedAdjectives = [];
    let fetchedAdverbs = [];
    let fetchedConjProps = []
    return this.nounsService.fetchNouns().pipe(
      switchMap(
        nouns => {
          fetchedNouns = nouns;
          return this.adjectivesService.fetchAdjectives();
        }
      ),
      switchMap(
        adjectives => {
          fetchedAdjectives = adjectives;
          return this.adverbsService.fetchAdverbs();
        }
      ),
      switchMap(
        adverbs => {
          fetchedAdverbs = adverbs;
          return this.conjPropsService.fetchConjProps();
          // return this.verbsService.fetchVerbs();
        }
      ),
      switchMap(
        conjProps => {
          fetchedConjProps = conjProps;
          return this.verbsService.fetchVerbs();
        }
      ),
      tap(
        verbs =>{
          this._words.next(fetchedNouns
            .concat(fetchedAdjectives)
            .concat(fetchedAdverbs)
            .concat(fetchedConjProps)
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
      case KindWord.Adjective:
        return this.adjectivesService.updateKnowledgeStrength(id, value);
      case KindWord.Adverb:
        return this.adverbsService.updateKnowledgeStrength(id, value);
      default:
        return this.conjPropsService.updateKnowledgeStrength(id, value);
    }
  }

}
