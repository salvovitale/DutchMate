import { Component, OnInit, OnDestroy } from '@angular/core';
import { Adjective, KindWord } from '../word.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { AdjectivesService } from '../services/adjectives.service';
import { InputValidator } from 'src/app/shared/util/inputValidator';
import { AdjectiveInput } from '../wordInput.module';

@Component({
  selector: 'app-edit-adjective',
  templateUrl: './edit-adjective.page.html',
  styleUrls: ['./edit-adjective.page.scss'],
})
export class EditAdjectivePage implements OnInit, OnDestroy {

  adj: Adjective
  form: FormGroup;
  adjId: string;
  isAlsoAdverb: boolean;
  isLoading = false;
  private myAdjSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private adjectivesService: AdjectivesService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public inputValidator: InputValidator
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('adjId')){
        this.navCtrl.navigateBack('/tabs/notebook');
        return;
      }
      this.adjId = paramMap.get('adjId');
      this.isLoading = true;
      this.myAdjSub = this.adjectivesService.getAdjective(this.adjId)
      .subscribe(adj => {
        this.adj = adj;
        this.isAlsoAdverb = adj.isAlsoAdverb;
        this.form = new FormGroup({
          word: new FormControl(this.adj.word, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          translations: new FormControl(this.adj.translations.join(', '), {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          eForm: new FormControl(this.adj.eForm, {
            updateOn: 'blur',
          }),
          adverbTranslations: new FormControl(this.adj.adverbTranslations.join(', '), {
            updateOn: 'blur',
          }),
          examples: new FormControl(this.adj.examples, {
            updateOn: 'blur',
          })
        });
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create({
          header: 'An error occurred!',
          message: 'Noun could not be fetched. Please try again later.',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.router.navigate(['/','tabs','notebook','adjectives', this.adjId]);
            }
          }]
        }).then(alertEl =>{
          alertEl.present();
        });
      });
    });
  }

  ngOnDestroy(): void {
    if(this.myAdjSub){
      this.myAdjSub.unsubscribe();
    }
  }

  onUpdateAdj(){
    if(!this.form.valid){
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating adjective...'
    }).then(loadingEl => {
      loadingEl.present();
      const adjEdited = new AdjectiveInput(
        this.form.value.word,
        this.form.value.translations,
        KindWord.Adjective,
        this.form.value.examples,
        this.form.value.eForm,
        this.isAlsoAdverb,
        this.form.value.adverbTranslations
      );
      this.adjectivesService.updateAdjective(this.adjId, adjEdited).subscribe(
        () =>
        {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/','tabs','notebook','adjectives', this.adjId]);
        }
      );
    })
  }

  onIsAlsoAdverbChange(event){
    this.isAlsoAdverb = event.target.value;
  }

}
