import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, LoadingController, ModalController } from '@ionic/angular';
import { NewNounComponent } from '../new-noun/new-noun.component';
import { NewVerbComponent } from '../new-verb/new-verb.component';
import { NewWordComponent } from '../new-word/new-word.component';
import { SearchWordService } from '../services/search-word.service';
import { KindOfWordUtil } from '../shared/kindOfWordUtil';
import { openAddWordModal } from '../shared/openAddWordModal';
import { EntireConjugation, KindWord, NounWithArticle, SearchedWord } from '../word.module';
import { WordsService } from '../words.service';
@Component({
  selector: 'app-search-word',
  templateUrl: './search-word.page.html',
  styleUrls: ['./search-word.page.scss'],
})
export class SearchWordPage implements OnInit {

  wordToSearch: string;
  searchResult: SearchedWord[]
  isLoading: boolean;
  constructor(
    private searchWordService: SearchWordService,
    private modalCtrl: ModalController,
    private wordsService: WordsService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private kindOfWordUtil: KindOfWordUtil
  ) { }

  ngOnInit() {
    this.isLoading = false;
  }

  onSearch() {
    this.isLoading = true;
    this.searchResult = [];
    this.searchWordService.searchWord(this.wordToSearch).subscribe((data) =>
      {
        data.forEach(item => {
          this.searchResult.push(
             new SearchedWord(
               item.word,
               item.dict_type,
               item.translations
             )
           )
        })
        this.isLoading = false;
      },
      errRes => {
        this.showAlert("Word not found or misspelt. Try again!");
        this.isLoading = false;
      }
    );
  }

  typeOfWord(word: SearchedWord){
    const kindOfWord: KindWord = this.kindOfWordUtil.retrieveKindFromString(word.dict_type)
    switch (kindOfWord) {
      case KindWord.Adjective:
        return '[Adj]'
      case KindWord.Adverb:
        return '[Adv]'
      case KindWord.Verb:
        return '[Vb]'
      case KindWord.Preposition:
        return '[Prep]'
      case KindWord.Conjunction:
        return '[Conj]'
      default:
        return '[Noun ('+ (word.dict_type as NounWithArticle ).Noun +')]';
    }
  }

  onAddWord(slidingItem: IonItemSliding, word: SearchedWord){
    const kindOfWord: KindWord = this.kindOfWordUtil.retrieveKindFromString(word.dict_type)
    switch (kindOfWord) {
      case KindWord.Adjective: case KindWord.Adverb: case KindWord.Preposition: case KindWord.Conjunction:
        openAddWordModal(this.modalCtrl, this.loadingCtrl, this.wordsService, {component: NewWordComponent, componentProps: {value: word}}, 'addWord');
        break;
      case KindWord.Verb:
        this.openVerbModal(word)
        break;
      default:
        openAddWordModal(this.modalCtrl, this.loadingCtrl, this.wordsService, {component: NewNounComponent, componentProps: {value: word}}, 'addNoun');
        break;
    }
    slidingItem.close();
  }

  onBlur(event: any){
    if(!event.target.value){
      this.wordToSearch='';
    }
    this.wordToSearch = event.target.value;
  }

  private openVerbModal(word: SearchedWord){
    this.searchWordService.conjugateVerb(word.word).subscribe((data : EntireConjugation) =>
      {
        openAddWordModal(this.modalCtrl, this.loadingCtrl, this.wordsService, {component: NewVerbComponent, componentProps: {verb: word, entireConj: data}}, 'addVerb');
      },
      errRes => {
        console.log(errRes);
        openAddWordModal(this.modalCtrl, this.loadingCtrl, this.wordsService, {component: NewVerbComponent, componentProps: {verb: word}}, 'addVerb');
      }
    );
  }

  private showAlert(message: string){
    this.alertCtrl.create({
      header: 'Search failed!!!',
      message: message,
      buttons: ['Okay']
    }).then(alertEl =>{
      alertEl.present();
    });
  }

}
