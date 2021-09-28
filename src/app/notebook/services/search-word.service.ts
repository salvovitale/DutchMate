import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EntireConj, NounWithArticle} from "../word.module";

interface SearchedWordData {
  word: string,
  dict_type: string  | NounWithArticle,
  translations: Array<string>
}

@Injectable({
  providedIn: 'root'
})
export class SearchWordService {

  constructor(private http: HttpClient) {}

  searchWord(word: string): any {
    return this.http.get<SearchedWordData[]>(
      `${environment.dictionaryApiUrl}/nl-to-en/translate/${word}`
    )
  }

  conjugateVerb(verb: string): any {
    return this.http.get<EntireConj>(
      `${environment.dictionaryApiUrl}/conjugate/${verb}`
    )
  }
}
