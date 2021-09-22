export enum KindWord {
  Noun,
  Verb,
  Adjective,
  Adverb,
  Preposition,
  Conjunction
}

export class Word {
  constructor(
    public id: string,
    public word: string,
    public translations: string[],
    public kind: KindWord,
    public examples: string,
    public firstAdded: Date,
    public lastUpdated: Date,
    public lastTimePracticed: Date,
    public knowledgeStrength: number
  ) {}
}

export class Noun extends Word {
  constructor(
    public id: string,
    public word: string,
    public translations: string[],
    public kind: KindWord,
    public examples: string,
    public hetDe: string,
    public firstAdded: Date,
    public lastUpdated: Date,
    public lastTimePracticed: Date,
    public knowledgeStrength: number
  ) {
    super(id, word, translations, kind, examples, firstAdded, lastUpdated, lastTimePracticed, knowledgeStrength);
  }
}

export class Verb extends Word {
  constructor(
    public id: string,
    public word: string,
    public translations: string[],
    public kind: KindWord,
    public examples: string,
    public auxVerb: string,
    public isRegular: boolean,
    public firstAdded: Date,
    public lastUpdated: Date,
    public lastTimePracticed: Date,
    public knowledgeStrength: number
  ) {
    super(id, word, translations, kind, examples, firstAdded, lastUpdated, lastTimePracticed, knowledgeStrength);
  }
}

export type NounWithArticle = {Noun: string}

export class SearchedWord {
  constructor(
    public word: string,
    public dict_type: string  | NounWithArticle,
    public translations: Array<string>
  ){}
}

export type ConjElement = {pronoun: string, conj: string}
export type ConjPerTime = {
  first_singular: ConjElement,
  second_singular: ConjElement,
  third_singular: ConjElement,
  first_plural: ConjElement,
  second_plural: ConjElement,
  third_plural: ConjElement
}

export type EntireConjugation = {
  present: ConjPerTime,
  present_perfect: ConjPerTime,
  simple_past: ConjPerTime,
  past_perfect: ConjPerTime,
  future: ConjPerTime,
  future_perfect: ConjPerTime,
  conditional: ConjPerTime,
  past_conditional: ConjPerTime,
}