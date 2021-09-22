import { Injectable } from '@angular/core';
import { KindWord, NounWithArticle } from '../word.module';

@Injectable({
  providedIn: 'root'
})
export class KindOfWordUtil {

  retrieveKindFromString(wordType: string  | NounWithArticle) : KindWord {
    switch (wordType) {
      case 'Adjective':
        return KindWord.Adjective;
      case 'Adverb':
        return KindWord.Adverb;
      case 'Verb':
        return KindWord.Verb;
      case 'Preposition':
        return KindWord.Preposition;
      case 'Conjunction':
        return KindWord.Conjunction;
      default:
        return KindWord.Noun;
    }
  }

  retrieveStringFromKind(wordType: KindWord) : string {
    switch (wordType) {
      case KindWord.Adjective:
        return 'Adjective';
      case KindWord.Adverb:
        return 'Adverb';
      case KindWord.Verb:
        return 'Verb';
      case KindWord.Preposition:
        return 'Preposition';
      case KindWord.Conjunction:
        return 'Conjunction';
      default:
        return 'Noun';
    }
  }

}