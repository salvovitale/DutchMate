import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Word } from '../../notebook/word.module';
import { Subscription } from 'rxjs';
import { WordsService } from '../../notebook/words.service';
import { InputValidator } from 'src/app/shared/util/inputValidator';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.page.html',
  styleUrls: ['./flashcards.page.scss'],
})
export class FlashcardsPage implements OnInit, OnDestroy {

  @ViewChild('f', {static : true}) form: NgForm;
  loadedWords : Word[];
  wordsToTrain : Word[];
  word: Word;
  noRepeatTime = 60*60*6*1000;
  knowledgeStrengthThreshold = 5;
  private wordsSub: Subscription;
  isLoading = false;
  isShowResults = false;
  isCorrect = false;

  constructor(
    private wordsService: WordsService,
    public inputValidator: InputValidator
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.wordsToTrain = [];
    this.wordsSub = this.wordsService.words.subscribe(
      words => {
        this.loadedWords = words;
        this.isLoading = false;
      }
    )
  }

  ionViewWillEnter(){
    this.isLoading = true
    this.wordsService.fetchWords().subscribe(
      () =>{
        this.findTrainingWord();
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    if(this.wordsSub){
      this.wordsSub.unsubscribe();
    }
  }

  onCheck(){
    if(!this.form.valid){
      return;
    }
    this.isCorrect = this.word.translations.some(translation => translation === this.form.value['flash-word'].trim());
    this.isShowResults = true;
  }

  onNextWord(){
    if(this.isCorrect){
      this.updateStrength(+1);
    } else {
      this.updateStrength(-1);
    }
  }

  onSkip(){
    this.updateStrength(-1);
  }

  private findTrainingWord(){
    let now = new Date().getTime();
    this.wordsToTrain = this.loadedWords
      .filter(w => (w.knowledgeStrength <= this.knowledgeStrengthThreshold
                    && w.lastTimePracticed < (new Date(now - this.noRepeatTime))));
    let randomIndex = Math.round(Math.random()*(this.wordsToTrain.length-1));
    this.isShowResults = false;
    this.word = this.wordsToTrain[randomIndex];
    this.isLoading= false;
  }

  private updateStrength(value: number){
    this.isLoading= true;
    this.wordsService.updateKnowledgeStrength(this.word.id, value, this.word.kind).subscribe(
      () => {
        this.loadedWords = this.loadedWords.filter(w => w.id !== this.word.id)
        this.findTrainingWord();
      }
    );
  }
}
