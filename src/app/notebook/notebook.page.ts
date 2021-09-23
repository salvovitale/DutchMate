import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word, KindWord, Noun } from './word.module';
import { ActionSheetController, ModalController, LoadingController } from '@ionic/angular';
import { WordsService } from './words.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { computeTimeInterval } from './shared/computeTimeInterval';

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
  showAddSearchedWord = false;
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
    private wordsService: WordsService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    if(this._wordsSub){
      this._wordsSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._wordsSub = this.wordsService.words.subscribe(
      words => {
        this.loadedWords = words;
        this.filterWords();
        this.isLoading = false;
      }
    )
  }

  ionViewWillEnter(){
    this.isLoading = true
    this.wordsService.fetchWords().subscribe(
      () =>{
        this.filterWords();
        this.isLoading = false;
      }
    );
  }

  getRoute(kind: KindWord, id: string){
    switch (kind) {
      case KindWord.Noun:
        return ['nouns', id];
      case KindWord.Verb:
        return ['verbs', id];
      default:
        return ['words', id];
    }
  }

  addKindOfWord(word: Word){
    switch (word.kind) {
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
        return '[Noun ('+ ( word as Noun ).hetDe +')]';
    }
  }


  onNewWord(){
    this.actionSheetCtrl.create({
      header: 'Add Word',
      buttons: [
        {
          text: 'Via Dictionary',
          handler: () => {
            this.router.navigate(['/','tabs','notebook','search-word']);
          }
        },
        {
          text: 'Manually',
          handler: () => {
            this.router.navigate(['/','tabs','notebook','manual-add-word']);
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
    this.timeSpanForFilter = computeTimeInterval(this.timeSpan)
    this.filterWords();
  }

  onSearchBar(event: any){
    if(!event.target.value){
      this.searchValue='';
    }
    let value: string = event.target.value;
    this.searchValue = value.toLowerCase();
    this.filterWords();
  }

  onSearchInDictionary(event: any){
    this.router.navigate(['/','tabs','notebook','search-word'], {queryParams:{ search : this.searchValue.trim()}});
  }

  onAddManually(event: any){
    this.router.navigate(['/','tabs','notebook','manual-add-word']);
  }

  private filterWords() {
    this.wordsService.words.subscribe(
      words => {
        this.loadedWords = words.filter(word =>
          (
            (word.word.toLowerCase().includes(this.searchValue) || word.translations.some(translation => translation.toLowerCase().includes(this.searchValue)))
              && word.lastUpdated > this.timeSpanForFilter
          )
        );
      }
    )
    if (this.loadedWords.length === 0 && this.searchValue !== '') {
      this.showAddSearchedWord = true;
    } else {
      this.showAddSearchedWord = false;
    }
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
