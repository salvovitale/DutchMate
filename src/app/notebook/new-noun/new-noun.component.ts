import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { InputValidator } from '../../shared/util/inputValidator';
import { NounInput } from '../wordInput.module';
import { KindWord, NounWithArticle, SearchedWord } from '../word.module';

@Component({
  selector: 'app-new-noun',
  templateUrl: './new-noun.component.html',
  styleUrls: ['./new-noun.component.scss'],
})
export class NewNounComponent implements OnInit {

  @Input() value: SearchedWord;
  @ViewChild('f', {static : true}) form: NgForm;
  word: string;
  translations: string;
  article: string;

  constructor(
    private modalCtrl: ModalController,
    public inputValidator: InputValidator,
    private alertCtrl: AlertController,
    ) { }

  ngOnInit() {
    if(this.value){
      this.word = this.value.word;
      this.translations = this.value.translations.join(', ');
      this.article = (this.value.dict_type as NounWithArticle).Noun
    }
  }

  onInfoTranslations(){
    this.alert('Info', 'Multiple translations must be separated with comas.')
  }

  onDiminutiveForm(){
    this.alert('Example', 'If the noun is "brief" the correct form for this input will be "briefje".');
  }

  onAddWord(){
    if(!this.form.valid){
      return;
    }
    const newInputWord = new NounInput(
      this.form.value['new-word'],
      this.form.value['translations'],
      KindWord.Noun,
      this.form.value['examples'],
      this.form.value['het-de'],
    )
    this.modalCtrl.dismiss({ newInputWord: newInputWord }, 'confirm');
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
