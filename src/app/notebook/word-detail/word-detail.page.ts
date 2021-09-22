import { Component, OnInit } from '@angular/core';
import { Word } from '../word.module';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { WordsService } from '../words.service';
import { switchMap } from 'rxjs/operators';
import { OtherWordsService } from '../services/other-words.service';

@Component({
  selector: 'app-adverb-detail',
  templateUrl: './word-detail.page.html',
  styleUrls: ['./word-detail.page.scss'],
})
export class WordDetailPage implements OnInit {

  word: Word;
  wordId: string;
  isLoading =false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private otherWordsService: OtherWordsService,
    private wordsService: WordsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.pipe(
      switchMap(
        paramMap =>{
          if(!paramMap.has('wordId')){
            this.navCtrl.navigateBack('/tabs/notebook');
            return;
          }
          this.wordId = paramMap.get('wordId');
          this.isLoading = true;
          return this.getGetWordObservable();
        }
      )
    )
    .subscribe(
      word =>{
        this.word = word;
        this.isLoading = false;
      }
    )
  }

  onDelete(){
    this.alertCtrl.create({
      header: 'Delete Word',
      message: 'Are you sure you want to delete this adverb?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.delete();
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }

    ]
    }).then(alertEl =>{
      alertEl.present();
    });
  }

  onEditWord(){
    this.router.navigate(['/','tabs','notebook','words','edit', this.wordId]);
  }

  private delete(){
    this.loadingCtrl.create({
      message: 'Deleting word...'
    })
    .then(loadingEl => {
      loadingEl.present();
      let deleteWordObservable = this.getDeleteWordObservable();
      deleteWordObservable.subscribe(()=>{
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/tabs/notebook');
      });
    })
  }

  private getGetWordObservable(){
    return this.otherWordsService.getOtherWord(this.wordId);

  }

  private getDeleteWordObservable(){
    return this.wordsService.deleteWord(this.wordId)
  }
}
