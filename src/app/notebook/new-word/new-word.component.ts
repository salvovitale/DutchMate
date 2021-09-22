import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { InputValidator } from 'src/app/shared/util/inputValidator';
import { KindOfWordUtil } from '../shared/kindOfWordUtil';
import { KindWord, SearchedWord } from '../word.module';
import { WordInput } from '../wordInput.module';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.scss'],
})
export class NewWordComponent implements OnInit {

  @Input() value: SearchedWord;
  @Input() kind: KindWord;
  @ViewChild('f', {static : true}) form: NgForm;
  word: string;
  typeTitle: string
  translations: string;

  constructor(
    private modalCtrl: ModalController,
    public inputValidator: InputValidator,
    private alertCtrl: AlertController,
    private kindOfWordUtil: KindOfWordUtil
  ) { }

  ngOnInit() {
    if(this.value){
      this.word = this.value.word;
      this.translations = this.value.translations.join(', ');
      this.kind = this.kindOfWordUtil.retrieveKindFromString(this.value.dict_type);
    }
    this.typeTitle = this.kindOfWordUtil.retrieveStringFromKind(this.kind)
  }

  onAddWord(){
    if(!this.form.valid){
      return;
    }
    const newInputWord = new WordInput(
      this.form.value['new-word'],
      this.form.value['translations'],
      this.kind,
      this.form.value['examples']
    );
    this.modalCtrl.dismiss({ newInputWord: newInputWord }, 'confirm');
  }

  onInfoTranslations(){
    this.alert('Info', 'Multiple translations must be separated with comas.')
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
