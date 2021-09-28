import { Component, OnInit, OnDestroy } from '@angular/core';
import { Word, KindWord } from '../word.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { InputValidator } from 'src/app/shared/util/inputValidator';
import { Subscription } from 'rxjs';
import { WordInput } from '../wordInput.module';
import { OtherWordsService } from '../services/other-words.service';

@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.page.html',
  styleUrls: ['./edit-word.page.scss'],
})
export class EditWordPage implements OnInit, OnDestroy {

  word: Word
  form: FormGroup
  kind: KindWord
  wordId: string;
  isLoading = false;
  private myGetSub: Subscription;
  private myUpdateSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private otherWordsService: OtherWordsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public inputValidator: InputValidator
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('wordId')){
        this.navCtrl.navigateBack('/tabs/notebook');
        return;
      }
      this.wordId = paramMap.get('wordId');

      this.isLoading = true;

      let getWordById = this.getGetWordObservable();
      this.myGetSub = getWordById.subscribe(word => {
        this.word = word;
        this.kind = word.kind;
        this.form = new FormGroup({
          word: new FormControl(this.word.word, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          translations: new FormControl(this.word.translations.join(', '), {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          examples: new FormControl(this.word.examples, {
            updateOn: 'blur',
          })
        });
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create({
          header: 'An error occurred!',
          message: 'Word could not be fetched. Please try again later.',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.router.navigate(['/','tabs','notebook','words', this.wordId]);
            }
          }]
        }).then(alertEl =>{
          alertEl.present();
        });
      });
    });
  }

  ngOnDestroy(): void {
    if(this.myGetSub){
      this.myGetSub.unsubscribe();
    }
    if(this.myUpdateSub){
      this.myUpdateSub.unsubscribe();
    }
  }

  onUpdateWord(){
    if(!this.form.valid){
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating word...'
    }).then(loadingEl => {
      loadingEl.present();
      const wordEdited = new WordInput(
        this.form.value.word,
        this.form.value.translations,
        this.kind,
        this.form.value.examples,
      );
      let updateWord = this.getUpdateWordObservable(wordEdited);
      this.myUpdateSub = updateWord.subscribe(
        () =>
        {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/','tabs','notebook', 'words', this.wordId]);
        }
      );
    })
  }

  private getGetWordObservable(){
    return this.otherWordsService.getOtherWord(this.wordId);
  }

  private getUpdateWordObservable(wordEdited: WordInput){
    return this.otherWordsService.updateOtherWord(this.wordId, wordEdited);
  }
}
