import { Component, OnInit } from '@angular/core';
import { Adverb } from '../word.module';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AdverbsService } from '../services/adverbs.service';
import { WordsService } from '../words.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-adverb-detail',
  templateUrl: './adverb-detail.page.html',
  styleUrls: ['./adverb-detail.page.scss'],
})
export class AdverbDetailPage implements OnInit {

  adv: Adverb;
  advId: string;
  isLoading =false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private adverbsService: AdverbsService,
    private wordsService: WordsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.pipe(
      switchMap(
        paramMap =>{
          if(!paramMap.has('advId')){
            this.navCtrl.navigateBack('/tabs/notebook');
          }
          this.advId = paramMap.get('advId');
          return this.adverbsService.getAdverb(this.advId);
        }
      )
    )
    .subscribe(
      adv =>{
        this.adv = adv;
        this.isLoading = false;
      }
    )
  }

  onDelete(advId: string){
    this.alertCtrl.create({
      header: 'Delete Adverb',
      message: 'Are you sure you want to delete this adverb?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.delete(advId);
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

  onEditAdv(id: string){
    this.router.navigate(['/','tabs','notebook','words','edit', id, 'kind', 'adverbs']);
  }

  private delete(advId: string){
    this.loadingCtrl.create({
      message: 'Deleting adverb...'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.wordsService.deleteAdverb(advId).subscribe(()=>{
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/tabs/notebook');
      });
    })
  }

}
