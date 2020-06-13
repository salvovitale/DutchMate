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
    public userId: string,
    public word: string,
    public translations: string[],
    public kind: KindWord,
    public examples: string,
    public firstAdded: Date,
    public lastUpdated: Date,
    public knowledgeStrength: number
  ) {}
}

export class Noun extends Word {
  constructor(
    public id: string,
    public userId: string,
    public word: string,
    public translations: string[],
    public kind: KindWord,
    public examples: string,
    public hetDe: string,
    public plural: string,
    public jeForm: string,
    public firstAdded: Date,
    public lastUpdated: Date,
    public knowledgeStrength: number
  ) {
    super(id, userId, word, translations, kind, examples, firstAdded, lastUpdated, knowledgeStrength);
  }
}

export class Verb extends Word {
  constructor(
    public id: string,
    public userId: string,
    public word: string,
    public translations: string[],
    public kind: KindWord,
    public examples: string,
    public firstPersonPresent: string,
    public firstPersonPastSingular: string,
    public firstPersonPastPlural: string,
    public pastParticiple: string,
    public auxVerb: string,
    public isRegular: boolean,
    public firstAdded: Date,
    public lastUpdated: Date,
    public knowledgeStrength: number
  ) {
    super(id, userId, word, translations, kind, examples, firstAdded, lastUpdated, knowledgeStrength);
  }
}

export class Adjective extends Word {
  constructor(
    public id: string,
    public userId: string,
    public word: string,
    public translations: string[],
    public kind: KindWord,
    public examples: string,
    public eForm: string,
    public isAlsoAdverb: boolean,
    public adverbTranslations: string[],
    public firstAdded: Date,
    public lastUpdated: Date,
    public knowledgeStrength: number
  ){
    super(id, userId, word, translations, kind, examples, firstAdded, lastUpdated, knowledgeStrength);
  }
}
export class Adverb extends Word {
  constructor(
    public id: string,
    public userId: string,
    public word: string,
    public translations: string[],
    public kind: KindWord,
    public examples: string,
    public firstAdded: Date,
    public lastUpdated: Date,
    public knowledgeStrength: number
  ){
    super(id, userId, word, translations, kind, examples, firstAdded, lastUpdated, knowledgeStrength);
  }
}