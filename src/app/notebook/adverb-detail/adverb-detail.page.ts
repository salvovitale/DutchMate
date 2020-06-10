import { Component, OnInit } from '@angular/core';
import { Adverb, Word } from '../word.module';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AdverbsService } from '../services/adverbs.service';
import { WordsService } from '../words.service';
import { switchMap } from 'rxjs/operators';
import { ConjPropsService } from '../services/conj-props.service';

@Component({
  selector: 'app-adverb-detail',
  templateUrl: './adverb-detail.page.html',
  styleUrls: ['./adverb-detail.page.scss'],
})
export class AdverbDetailPage implements OnInit {

  word: Word;
  wordId: string;
  kindId: string;
  isLoading =false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private adverbsService: AdverbsService,
    private conjPropsService: ConjPropsService,
    private wordsService: WordsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.pipe(
      switchMap(
        paramMap =>{
          if(!paramMap.has('wordId') || !paramMap.has('kindId')){
            this.navCtrl.navigateBack('/tabs/notebook');
            return;
          }
          this.wordId = paramMap.get('wordId');
          this.kindId = paramMap.get('kindId');
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
    this.router.navigate(['/','tabs','notebook','words','edit', this.wordId, 'kind', this.kindId]);
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
    switch (this.kindId) {
      case 'adverbs':
        return this.adverbsService.getAdverb(this.wordId);
      case 'conj-props':
        return this.conjPropsService.getConjProp(this.wordId);
      default:
        return null;
    }
  }

  private getDeleteWordObservable(){
    switch (this.kindId) {
      case 'adverbs':
        return this.wordsService.deleteAdverb(this.wordId);
      case 'conj-props':
        return this.wordsService.deleteConjProp(this.wordId);
      default:
        return null;
    }
  }
}
