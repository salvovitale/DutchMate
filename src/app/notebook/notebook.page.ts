import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word, KindWord, Noun } from './word.module';
import { ActionSheetController, ModalController, LoadingController } from '@ionic/angular';
import { NewNounComponent } from './new-noun/new-noun.component';
import { NewVerbComponent } from './new-verb/new-verb.component';
import { WordsService } from './words.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notebook',
  templateUrl: 'notebook.page.html',
  styleUrls: ['notebook.page.scss']
})
export class NotebookPage implements OnInit, OnDestroy {

  loadedWords : Word[];
  private _wordsSub: Subscription; 
    
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
    console.log("Notebook Init");
    this._wordsSub = this.wordsService.words.subscribe(
      words => {
        this.loadedWords = words;
      }
    )
  }

  ionViewWillEnter(){
    console.log("Notebook View Will Enter");
    this.wordsService.fetchWords().subscribe();
  }

  onSearchBar(event: any){
    this.wordsService.words.subscribe(
      words => {
        if(!event.target.value){
          this.loadedWords = words;
        }
        const searchValue = event.target.value;
        this.loadedWords = words.filter(
          word => (
            word.word.includes(searchValue) || word.translations.some(translation => translation.includes(searchValue))
          )
        );
      }
    )
  }

  getRoute(kind: KindWord){
    switch (kind) {
      case KindWord.Noun:
        return 'nouns';
        break;
      case KindWord.Verb:
        return 'verbs';
        break;
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
          text: 'Adjective/Adverb/Pronoun',
          handler: () => {
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
}
