import { Component, OnInit } from '@angular/core';
import { Adjective } from '../word.module';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AdjectivesService } from '../services/adjectives.service';
import { WordsService } from '../words.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-adjective-detail',
  templateUrl: './adjective-detail.page.html',
  styleUrls: ['./adjective-detail.page.scss'],
})
export class AdjectiveDetailPage implements OnInit {

  adj: Adjective;
  adjId: string;
  isLoading =false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private adjectivesService: AdjectivesService,
    private wordsService: WordsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.pipe(
      switchMap(
        paramMap =>{
          if(!paramMap.has('adjId')){
            this.navCtrl.navigateBack('/tabs/notebook');
          }
          this.adjId = paramMap.get('adjId');
          return this.adjectivesService.getAdjective(this.adjId);
        }
      )
    )
    .subscribe(
      adj =>{
        this.adj = adj;
        this.isLoading = false;
      }
    )
  }

  onDelete(adjId: string){
    this.alertCtrl.create({
      header: 'Delete Adjective',
      message: 'Are you sure you want to delete this adjective?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.delete(adjId);
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

  onEditAdj(id: string){
    this.router.navigate(['/','tabs','notebook','adjectives','edit', id]);
  }

  private delete(adjId: string){
    this.loadingCtrl.create({
      message: 'Deleting adjective...'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.wordsService.deleteAdjective(adjId).subscribe(()=>{
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/tabs/notebook');
      });
    })
  }

}
