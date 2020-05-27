import { KindWord } from './word.module';

export class WordInput {
  constructor(
    public word: string,
    public translations: string,
    public kind: KindWord,
    public examples: string,
  ) {}
}

export class NounInput extends WordInput {
  constructor(
    public word: string,
    public translations: string,
    public kind: KindWord,
    public examples: string,
    public hetDe: string,
    public plural: string,
  ) {
    super(word, translations, kind, examples);
  }
}

export class VerbInput extends WordInput {
  constructor(
    public word: string,
    public translations: string,
    public kind: KindWord,
    public examples: string,
    public firstPersonPresent: string,
    public firstPersonPastSingular: string,
    public firstPersonPastPlural: string,
    public pastParticiple: string,
    public auxVerb: string,
    public isRegular: boolean,
  ) {
    super(word, translations, kind, examples);
  }
}

export class AdjectiveInput extends WordInput {
  constructor(
    public word: string,
    public translations: string,
    public kind: KindWord,
    public examples: string,
    public eForm: string,
    public isAlsoAdverb: boolean,
    public adverbTranslations: string,
  ) {
    super(word, translations, kind, examples);
  }
}

export class AdverbInput extends WordInput {
  constructor(
    public word: string,
    public translations: string,
    public kind: KindWord,
    public examples: string,
  ) {
    super(word, translations, kind, examples);
  }
}