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
  timeSpan= 'all';
  timeSpanForFilter = new Date('01-01-1999');
  searchValue='';
  isLoading = false;

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

  onTimeSpanChange(event: any){
    if(!event.target.value){
      return;
    }
    this.timeSpan = event.target.value
    const now = new Date().getTime();
    switch (this.timeSpan) {
      case '15m':
        this.timeSpanForFilter = new Date(now - 60*15*1000);
        break;
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
      case '2d':
        this.timeSpanForFilter = new Date(now - 60*60*24*2*1000);
        break;
      case '1w':
        this.timeSpanForFilter = new Date(now - 60*60*24*7*1000);
        break;
      case '2w':
        this.timeSpanForFilter = new Date(now - 60*60*24*7*2*1000);
        break;
      case '1M':
        this.timeSpanForFilter = new Date(now - 60*60*24*30*1000);
        break;
      case 'all':
        this.timeSpanForFilter = new Date('01-01-1999');
        break;
      default:
        this.timeSpanForFilter = new Date('01-01-1999');
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
  }
}
