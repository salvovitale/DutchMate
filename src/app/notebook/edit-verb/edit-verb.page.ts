import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Verb, KindWord } from '../word.module';
import { InputValidator } from 'src/app/shared/util/inputValidator';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { VerbsService } from '../services/verbs.service';
import { Subscription } from 'rxjs';
import { VerbInput } from '../wordInput.module';

@Component({
  selector: 'app-edit-verb',
  templateUrl: './edit-verb.page.html',
  styleUrls: ['./edit-verb.page.scss'],
})
export class EditVerbPage implements OnInit {

  verb: Verb;
  verbId: string;
  form: FormGroup;
  auxVerb: string;
  isRegular: boolean;
  isLoading = false;
  private myVerbSub: Subscription;


  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private verbsService: VerbsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public inputValidator: InputValidator
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('verbId')){
        this.navCtrl.navigateBack('/tabs/notebook');
        return;
      }
      this.verbId = paramMap.get('verbId');
      this.isLoading = true;
      this.myVerbSub = this.verbsService.getVerb(this.verbId)
      .subscribe(verb => {
        this.verb = verb;
        this.auxVerb = verb.auxVerb;
        this.isRegular = verb.isRegular;
        this.form = new FormGroup({
          word: new FormControl(this.verb.word, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          translations: new FormControl(this.verb.translations.join(', '), {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          examples: new FormControl(this.verb.examples, {
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
              this.router.navigate(['/','tabs','notebook','verbs', this.verbId]);
            }
          }]
        }).then(alertEl =>{
          alertEl.present();
        });
      });
    });
  }

  onAuxVerbChange(event){
    if(!event.target.value){
      return;
    }
    this.auxVerb = event.target.value;
  }

  onIsRegularChange(event){
    if(!event.target.value){
      return;
    }
    this.isRegular = event.target.value;
  }

  onUpdateVerb(){
    if(!this.form.valid){
      return;
    }
    const verbEdited = new VerbInput(
      this.form.value.word,
      this.form.value.translations,
      KindWord.Verb,
      this.form.value.examples,
      this.auxVerb,
      this.isRegular
    );
    this.loadingCtrl.create({
      message: 'Updating verb...'
    })
    .then(
      loadingEl => {
        loadingEl.present();
        this.verbsService.updateVerb(this.verbId, verbEdited).subscribe(
          () => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/','tabs','notebook','verbs', this.verbId]);
          }
        );
      }
    )
  }

}
