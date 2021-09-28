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

export type ConjTense = {
  header: string,
  conj: string[]
}

export type ConjGroup = {
  group_name: string,
  group_conj: ConjTense[]
}

export type EntireConj = {
  pronouns: string[],
  entire_conj: ConjGroup[]
}