import { Component, OnInit } from '@angular/core';
import { Noun, KindWord } from '../word.module';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { NounsService } from '../services/nouns.service';
import { WordsService } from '../words.service';

@Component({
  selector: 'app-noun-detail',
  templateUrl: './noun-detail.page.html',
  styleUrls: ['./noun-detail.page.scss'],
})
export class NounDetailPage implements OnInit {

  noun: Noun;
  nounId: string;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private nounsService: NounsService,
    private wordsService: WordsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.pipe(
      switchMap(
        paramMap =>{
          if(!paramMap.has('nounId')){
            this.navCtrl.navigateBack('/tabs/notebook');
          }
          this.nounId = paramMap.get('nounId');
          return this.nounsService.getNoun(this.nounId);
        }
      )
    )
    .subscribe(
      noun =>{
        this.noun = noun;
        this.isLoading = false;
      }
      // error => {
      //   this.alertCtrl.create({
      //     header: 'An error occurred!',
      //     message: 'Word could not be fetched. Please try again later.',
      //     buttons: [{
      //       text: 'Ok',
      //       handler: () => {
      //         this.router.navigate(['/tabs/notebook']);
      //         this.isLoading = false;
      //       }
      //     }]
      //   }).then(alertEl =>{
      //     alertEl.present();
      //   });
      // }
    )
  }

  onDelete(nounId: string){
    this.loadingCtrl.create({
      message: 'Deleting noun...'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.wordsService.deleteNoun(nounId).subscribe(()=>{
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/tabs/notebook');
      });
    })
  }

  onEditNoun(id: string){
    this.router.navigate(['/','tabs','notebook','nouns','edit', id]);
  }
}
