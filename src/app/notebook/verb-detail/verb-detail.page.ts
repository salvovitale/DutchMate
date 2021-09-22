import { Component, OnInit } from '@angular/core';
import { EntireConjugation, Verb } from '../word.module';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { VerbsService } from '../services/verbs.service';
import { WordsService } from '../words.service';
import { switchMap } from 'rxjs/operators';
import { VerbConjComponent } from '../verb-conj/verb-conj.component';
import { SearchWordService } from '../services/search-word.service';

@Component({
  selector: 'app-verb-detail',
  templateUrl: './verb-detail.page.html',
  styleUrls: ['./verb-detail.page.scss'],
})
export class VerbDetailPage implements OnInit {

  verb: Verb;
  verbId: string;
  entireConj: EntireConjugation;
  isLoading = false;
  showMore = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private verbsService: VerbsService,
    private wordsService: WordsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private searchWordService: SearchWordService,
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
        this.searchWordService.conjugateVerb(this.verb.word).subscribe((data : EntireConjugation) =>
        {
          this.entireConj = data;
          this.isLoading = false;
        },
        errRes => {
          console.log(errRes);
          this.isLoading = false;
        }
        );
      }
    )
  }

  onDelete(verbId: string){
    this.alertCtrl.create({
      header: 'Delete Verb',
      message: 'Are you sure you want to delete this verb?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.delete(verbId);
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

  onEditNoun(id: string){
    this.router.navigate(['/','tabs','notebook','verbs','edit', id]);
  }

  openConjugation(){
    this.modalCtrl.create({component: VerbConjComponent, componentProps: {entireConj: this.entireConj}}).then(modalEl =>{
      modalEl.present();
      return modalEl.onDidDismiss();
    })
  }

  private delete(verbId: string){
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
}
