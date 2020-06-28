import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { VerbInput } from '../wordInput.module';
import { KindWord } from '../word.module';
import { InputValidator } from '../../shared/util/inputValidator';

@Component({
  selector: 'app-new-verb',
  templateUrl: './new-verb.component.html',
  styleUrls: ['./new-verb.component.scss'],
})
export class NewVerbComponent implements OnInit {

  @ViewChild('f', {static : true}) form: NgForm;

  constructor(
    private modalCtrl: ModalController,
    public inputValidator: InputValidator,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {}

  onAddVerb(){
    if(!this.form.valid){
      return;
    }
    this.modalCtrl.dismiss(
    { newVerbInputData: new VerbInput(
      this.form.value['new-verb'],
      this.form.value['translations'],
      KindWord.Verb,
      this.form.value['examples'],
      this.form.value['first-person-present'],
      this.form.value['first-person-past-singular'],
      this.form.value['first-person-past-plural'],
      this.form.value['past-participle'],
      this.form.value['aux-verb'],
      this.form.value['is-regular'])
    }, 'confirm');
  }

  onInfoTranslations(){
    this.alert('Info', 'Multiple translations must be separated with comas.')
  }

  onInfo1stPersonPresentSingular(){
    this.alert('Example', 'If the verb is "gaan", the correct form for this input will be "ga". '
                          +'If the verb is "aankomen", the correct form for this input will be "kom aan".');
  }

  onInfo1stPastPresentSingular(){
    this.alert('Example', 'If the verb is "gaan" the correct form for this input will be "ging". '
                          +'If the verb is "aankomen", the correct form for this input will be "kwam aan".');
  }

  onInfo1stPastPresentPlural(){
    this.alert('Example', 'If the verb is "gaan" the correct form for this input will be "gingen". '
                         +'If the verb is "aankomen", the correct form for this input will be "kwamen aan".');
  }

  onInfoPastParticiple(){
    this.alert('Example', 'If the verb is "gaan" the correct form for this input will be "gegaan". '
                         +'If the verb is "aankomen", the correct form for this input will be "aangekomen".');
  }

  alert(header: string, message: string){
    this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'ok'
        }
    ]
    }).then(alertEl =>{
      alertEl.present();
    });
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
