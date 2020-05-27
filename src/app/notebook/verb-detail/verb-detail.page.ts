import { Component, OnInit } from '@angular/core';
import { Verb } from '../word.module';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { NounsService } from '../services/nouns.service';
import { VerbsService } from '../services/verbs.service';
import { WordsService } from '../words.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-verb-detail',
  templateUrl: './verb-detail.page.html',
  styleUrls: ['./verb-detail.page.scss'],
})
export class VerbDetailPage implements OnInit {

  verb: Verb;
  verbId: string;
  isLoading = false;
  showMore = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private verbsService: VerbsService,
    private wordsService: WordsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.pipe(
      switchMap(
        paramMap =>{
          if(!paramMap.has('verbId')){
            this.navCtrl.navigateBack('/tabs/notebook');
          }
          this.verbId = paramMap.get('verbId');
          return this.verbsService.getVerb(this.verbId);
        }
      )
    )
    .subscribe(
      verb =>{
        this.verb = verb;
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

  onShowMore(){
    this.showMore = !this.showMore;
  }

  onDelete(verbId: string){
    this.loadingCtrl.create({
      message: 'Deleting verb...'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.wordsService.deleteVerb(verbId).subscribe(()=>{
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/tabs/notebook');
      });
    })
  }

  onEditNoun(id: string){
    this.router.navigate(['/','tabs','notebook','verbs','edit', id]);
  }
}
