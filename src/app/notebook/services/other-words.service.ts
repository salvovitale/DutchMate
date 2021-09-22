import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { WordInput } from '../wordInput.module';
import { Word, KindWord } from '../word.module';
import { take, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

interface WordData {
  userId: string;
  word: string;
  translations: string[];
  kind: KindWord;
  examples: string;
  firstAdded: string;
  lastUpdated: string;
  lastTimePracticed: string,
  knowledgeStrength: number;
}

@Injectable({
  providedIn: 'root'
})
export class OtherWordsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addOtherWord(wordDataInput: WordInput){
    let separatedTranslations = wordDataInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
    let newWord: Word;
    let fetchedToken : string;
    return this.authService.token.pipe(
      take(1),
      switchMap(
        token => {
          fetchedToken = token;
          return this.authService.userId;
        }
      ),
      take(1),
      switchMap(
        userId =>{
          newWord = new Word(
            Math.random().toString(),
            wordDataInput.word,
            separatedTranslations,
            wordDataInput.kind,
            wordDataInput.examples,
            new Date(),
            new Date(),
            new Date(),
            0
          )
          return this.http.post<{name: string}>(
            `${environment.databaseUrl}/${userId}/other-words.json?auth=${fetchedToken}`,
            {...newWord, id: null}
          )
        }
      ),
      switchMap(
        resData =>{
          newWord.id = resData.name;
          return of(newWord);
        }
      )
    )
  }

  fetchOtherWords(){
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      take(1),
      switchMap(
        token =>{
          return this.http.get<{[key: string]:WordData}>(
            `${environment.databaseUrl}/${fetchedUserId}/other-words.json?auth=${token}`
          )
        }
      ),
      switchMap(
        resData =>{
          const words = [];
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              let lastTimePracticed: Date;
              if(resData[key].lastTimePracticed){
                lastTimePracticed = new Date(resData[key].lastTimePracticed);
              } else {
                lastTimePracticed = new Date(resData[key].firstAdded);
              }
              words.push(new  Word(
                key,
                resData[key].word,
                resData[key].translations,
                +resData[key].kind,
                resData[key].examples,
                new Date(resData[key].firstAdded),
                new Date(resData[key].lastUpdated),
                lastTimePracticed,
                +resData[key].knowledgeStrength,
              ));
            }
          }
          return of(words);
        }
      )
    )
  }

  getOtherWord(id: string) {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      take(1),
      switchMap(
        token => {
          return this.http.get<WordData>(
            `${environment.databaseUrl}/${fetchedUserId}/other-words/${id}.json?auth=${token}`
          )
        }
      ),
      map(
        wordData =>{
          return new Word(
            id,
            wordData.word,
            wordData.translations,
            +wordData.kind,
            wordData.examples,
            new Date(wordData.firstAdded),
            new Date(wordData.lastUpdated),
            new Date(wordData.lastTimePracticed),
            +wordData.knowledgeStrength
          )
        }
      )
    )
  }

  deleteOtherWord(id: string){
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      take(1),
      switchMap(
        token => {
          return this.http.delete(
            `${environment.databaseUrl}/${fetchedUserId}/other-words/${id}.json?auth=${token}`
          );
        }
      )
    );
  }

  updateOtherWord(id: string, wordInput: WordInput){
    let separatedTranslation = wordInput.translations.split(',').map(s => s.trim()).filter(el => el !== '');
    let fetchedToken: string;
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      take(1),
      switchMap(
        token => {
          fetchedToken = token;
          return this.getOtherWord(id);
        }
      ),
      switchMap(
        oldWord => {
          let updatedAdverb = new Word(
            id,
            wordInput.word,
            separatedTranslation,
            wordInput.kind,
            wordInput.examples,
            oldWord.firstAdded,
            new Date(),
            oldWord.lastTimePracticed,
            oldWord.knowledgeStrength
          );
          return this.http.put(
            `${environment.databaseUrl}/${fetchedUserId}/other-words/${id}.json?auth=${fetchedToken}`,
                {...updatedAdverb, id: null}
          )
        }
      )
    )
  }

  updateKnowledgeStrength(id: string, value: number){
    let fetchedToken: string;
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(
        userId => {
          fetchedUserId = userId;
          return this.authService.token;
        }
      ),
      take(1),
      switchMap(
        token => {
          fetchedToken = token;
          return this.getOtherWord(id);
        }
      ),
      switchMap(
        word => {
          return this.http.put(
            `${environment.databaseUrl}/${fetchedUserId}/other-words/${id}.json?auth=${fetchedToken}`,
            {
              ...word,
              id: null,
              knowledgeStrength: word.knowledgeStrength + value,
              lastTimePracticed: new Date()
            }
          )
        }
      )
    )
  }
}
