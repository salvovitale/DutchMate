import { Component, OnInit, OnDestroy } from '@angular/core';
import { Noun, KindWord } from '../word.module';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { NounsService } from '../services/nouns.service';
import { InputValidator } from '../../shared/util/inputValidator';
import { NounInput } from '../wordInput.module';

@Component({
  selector: 'app-edit-noun',
  templateUrl: './edit-noun.page.html',
  styleUrls: ['./edit-noun.page.scss'],
})
export class EditNounPage implements OnInit , OnDestroy {

  noun: Noun
  form: FormGroup;
  nounId: string;
  hetDe: string;
  isLoading = false;
  private myNounSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private nounsService: NounsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public inputValidator: InputValidator
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('nounId')){
        this.navCtrl.navigateBack('/tabs/notebook');
        return;
      }
      this.nounId = paramMap.get('nounId');
      this.isLoading = true;
      this.myNounSub = this.nounsService.getNoun(this.nounId)
      .subscribe(noun => {
        this.noun = noun;
        this.hetDe = noun.hetDe;
        // we need to initialize it here. Because this code run
        // asyncronoysly so if we init outside it can be that the placeId has not be selected yet.
        this.form = new FormGroup({
          word: new FormControl(this.noun.word, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          translations: new FormControl(this.noun.translations.join(', '), {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          examples: new FormControl(this.noun.examples, {
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
              this.router.navigate(['/','tabs','notebook','nouns', this.nounId]);
            }
          }]
        }).then(alertEl =>{
          alertEl.present();
        });
      });
    });
  }

  ngOnDestroy(): void {
    if(this.myNounSub){
      this.myNounSub.unsubscribe();
    }
  }

  onUpdateNoun(){
    if(!this.form.valid){
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating noun...'
    }).then(loadingEl => {
      loadingEl.present();
      const nounEdited = new NounInput(
        this.form.value.word,
        this.form.value.translations,
        KindWord.Noun,
        this.form.value.examples,
        this.hetDe,
      );
      this.nounsService.updateNoun(this.nounId, nounEdited).subscribe(
        () =>
        {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/','tabs','notebook','nouns', this.nounId]);
        }
      );
    })
  }

  onHetDeChange(event){
    if(!event.target.value){
      return;
    }
    this.hetDe = event.target.value;
  }
}