import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { VerbInput } from '../wordInput.module';
import { EntireConj, KindWord, SearchedWord } from '../word.module';
import { InputValidator } from '../../shared/util/inputValidator';
import { VerbConjComponent } from '../verb-conj/verb-conj.component';

@Component({
  selector: 'app-new-verb',
  templateUrl: './new-verb.component.html',
  styleUrls: ['./new-verb.component.scss'],
})
export class NewVerbComponent implements OnInit {

  @Input() verb: SearchedWord;
  @Input() entireConj: EntireConj;
  @ViewChild('f', {static : true}) form: NgForm;
  word: string;
  translations: string;
  auxVerb: 'zijn' | 'hebben'

  constructor(
    private modalCtrl: ModalController,
    public inputValidator: InputValidator,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    if(this.verb){
      this.word = this.verb.word;
      this.translations = this.verb.translations.join(', ');
    }
    if(this.entireConj){
      const ppFp: string = this.entireConj.entire_conj[0].group_conj[1].conj[3];
      this.auxVerb = ppFp.includes('zijn') ? 'zijn' : 'hebben';
    }
  }

  onAddVerb(){
    if(!this.form.valid){
      return;
    }
    this.modalCtrl.dismiss(
    { newInputWord: new VerbInput(
      this.form.value['new-verb'],
      this.form.value['translations'],
      KindWord.Verb,
      this.form.value['examples'],
      this.form.value['aux-verb'],
      this.form.value['is-regular'])
    }, 'confirm');
  }

  onInfoTranslations(){
    this.alert('Info', 'Multiple translations must be separated with comas.')
  }

  openConjugation(){
    this.modalCtrl.create({component: VerbConjComponent, componentProps: {entireConj: this.entireConj}}).then(modalEl =>{
      modalEl.present();
      return modalEl.onDidDismiss();
    })
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
