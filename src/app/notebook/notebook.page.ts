import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word, KindWord, Noun } from './word.module';
import { ActionSheetController, ModalController, LoadingController } from '@ionic/angular';
import { NewNounComponent } from './new-noun/new-noun.component';
import { NewVerbComponent } from './new-verb/new-verb.component';
import { WordsService } from './words.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NewAdjAdvComponent } from './new-adj-adv/new-adj-adv.component';

@Component({
  selector: 'app-notebook',
  templateUrl: 'notebook.page.html',
  styleUrls: ['notebook.page.scss']
})
export class NotebookPage implements OnInit, OnDestroy {

  loadedWords : Word[];
  private _wordsSub: Subscription;
  timeSpan= '0a';
  timeSpanForFilter = new Date(new Date().getTime() - 20*12*60*60*24*30*1000);
  searchValue='';
  kindFilter= '0a';
  isLoading = false;
  segments = [{value: '0a', showValue: 'All'},
                {value: '1n', showValue: 'N'},
                {value: '2v', showValue: 'V'},
                {value: '3aa', showValue: 'A/A'},
                {value: '4pc', showValue: 'P/C'},
              ]
  timeSelects = [{value: '0a', showValue: 'all'},
                 {value: '1h', showValue: '1 h'},
                 {value: '6h', showValue: '6 h'},
                 {value: '12h', showValue: '12 h'},
                 {value: '1d', showValue: '1 d'},
                 {value: '1w', showValue: '1 w'},
                 {value: '1M', showValue: '1 M'},
                ]

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private wordsService: WordsService,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    if(this._wordsSub){
      this._wordsSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._wordsSub = this.wordsService.words.subscribe(
      words => {
        this.loadedWords = words;
      }
    )
  }

  ionViewWillEnter(){
    this.isLoading = true
    this.wordsService.fetchWords().subscribe(
      () =>{
        this.isLoading = false;
      }
    );
  }

  getRoute(kind: KindWord){
    switch (kind) {
      case KindWord.Noun:
        return 'nouns';
      case KindWord.Verb:
        return 'verbs';
      case KindWord.Adjective:
        return 'adjectives';
      case KindWord.Adverb:
        return 'adverbs';
      default:
        return 'words'
        break;
    }
  }

  addHetDe(word: Word){
    if (word.kind === KindWord.Noun){
      let noun = word as Noun;
      return ' (' + noun.hetDe +  ')';
    }
    return '';
  }


  onNewWord(){
    this.actionSheetCtrl.create({
      header: 'Add',
      buttons: [
        {
          text: 'Noun',
          handler: () => {
            this.openNewNounModal();
          }
        },
        {
          text: 'Verb',
          handler: () => {
            this.openNewVerbModal();
          }
        },
        {
          text: 'Adjective/Adverb',
          handler: () => {
            this.openNewAdjAdvModal();
          }
        },
        {
          text: 'Preposition/Conjunction',
          handler: () => {
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    .then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openNewAdjAdvModal(){
    this.modalCtrl.create(
      {component: NewAdjAdvComponent,
      componentProps: {}}).then(modalEl =>{
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then( resultData => {
      if(resultData.role === 'adjective'){
        this.loadingCtrl
        .create({
          message: 'Adding a adjective...'
        })
        .then(loadingEl =>
          {
            loadingEl.present();
            const data = resultData.data
            this.wordsService.addAdjective(data.newAdjectiveInputData)
            .subscribe(
            () => {
              loadingEl.dismiss();
            });
          }
        );
      }
      if(resultData.role === 'adverb'){
        this.loadingCtrl
        .create({
          message: 'Adding a adverb...'
        })
        .then(loadingEl =>
          {
            loadingEl.present();
            const data = resultData.data
            this.wordsService.addAdverb(data.newAdverbInputData)
            .subscribe(
            () => {
              loadingEl.dismiss();
            });
          }
        );
      }
    });
  }

  openNewVerbModal(){
    this.modalCtrl.create(
      {component: NewVerbComponent,
      componentProps: {}}).then(modalEl =>{
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then( resultData => {
      if(resultData.role === 'confirm'){
        this.loadingCtrl
        .create({
          message: 'Adding a verb...'
        })
        .then(loadingEl =>
          {
            loadingEl.present();
            const data = resultData.data
            this.wordsService.addVerb(data.newVerbInputData)
            .subscribe(
            () => {
              loadingEl.dismiss();
            });
          }
        );
      }

    });
  }

  openNewNounModal(){
    this.modalCtrl.create(
      {component: NewNounComponent,
      componentProps: {}}).then(modalEl =>{
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then( resultData => {
      if(resultData.role === 'confirm'){
        this.loadingCtrl
        .create({
          message: 'Adding a noun...'
        })
        .then(loadingEl =>
          {
            loadingEl.present();
            const data = resultData.data
            this.wordsService.addNoun(data.newNounInputData)
            .subscribe(
            () => {
              loadingEl.dismiss();
            });
          }
        );
      }
    });
  }

  onSwitchSegment(event: any){
    if(!event.target.value){
      return;
    }
    this.kindFilter = event.target.value;
    this.filterWords();
  }

  onTimeSpanChange(event: any){
    if(!event.target.value){
      return;
    }
    this.timeSpan = event.target.value
    const now = new Date().getTime();
    switch (this.timeSpan) {
      case '1h':
        this.timeSpanForFilter = new Date(now - 60*60*1000);
        break;
      case '6h':
        this.timeSpanForFilter = new Date(now - 60*60*6*1000);
        break;
      case '12h':
        this.timeSpanForFilter = new Date(now - 60*60*12*1000);
        break;
      case '1d':
        this.timeSpanForFilter = new Date(now - 60*60*24*1000);
        break;
      case '1w':
        this.timeSpanForFilter = new Date(now - 60*60*24*7*1000);
        break;
      case '1M':
        this.timeSpanForFilter = new Date(now - 60*60*24*30*1000);
        break;
      case '0a':
        this.timeSpanForFilter = new Date(now - 20*12*60*60*24*30*1000);
        break;
      default:
        this.timeSpanForFilter = new Date(now - 20*12*60*60*24*30*1000);
        break;
    }
    this.filterWords();
  }

  onSearchBar(event: any){
    if(!event.target.value){
      this.searchValue='';
    }
    this.searchValue = event.target.value;
    this.filterWords();
  }

  private filterWords() {
    this.wordsService.words.subscribe(
      words => {
        this.loadedWords = words.filter(word =>
          (
            (word.word.includes(this.searchValue) || word.translations.some(translation => translation.includes(this.searchValue)))
              && word.lastUpdated > this.timeSpanForFilter
          )
        );
      }
    )
    this.filterOnSegment();
  }

  private filterOnSegment() {
    switch (this.kindFilter) {
      case '1n':
        this.loadedWords = this.loadedWords.filter(w => w.kind === KindWord.Noun);
        break;
      case '2v':
        this.loadedWords = this.loadedWords.filter(w => w.kind === KindWord.Verb);
        break;
      case '3aa':
        this.loadedWords = this.loadedWords.filter(w => (w.kind === KindWord.Adjective || w.kind === KindWord.Adverb));
        break;
      case '4pc':
        this.loadedWords = this.loadedWords.filter(w => (w.kind === KindWord.Preposition || w.kind === KindWord.Conjunction));
        break;
      case '0a':
        break;
      default:
        break;
    }
  }
}
