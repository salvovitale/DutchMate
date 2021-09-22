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
    public hetDe: string
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
    public auxVerb: string,
    public isRegular: boolean,
  ) {
    super(word, translations, kind, examples);
  }
}