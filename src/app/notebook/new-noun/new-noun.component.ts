import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { InputValidator } from '../../shared/util/inputValidator';
import { NounInput } from '../wordInput.module';
import { KindWord } from '../word.module';

@Component({
  selector: 'app-new-noun',
  templateUrl: './new-noun.component.html',
  styleUrls: ['./new-noun.component.scss'],
})
export class NewNounComponent implements OnInit {

  @ViewChild('f', {static : true}) form: NgForm;
  
  constructor(
    private modalCtrl: ModalController,
    public inputValidator: InputValidator
  ) { }

  ngOnInit() {}

  onAddWord(){
    if(!this.form.valid){
      return;
    }
    const newNounInputData = new NounInput(
      this.form.value['new-word'],
      this.form.value['translations'],
      KindWord.Noun,
      this.form.value['examples'],
      this.form.value['het-de'],
      this.form.value['plural']
    )
    this.modalCtrl.dismiss({ newNounInputData: newNounInputData }, 'confirm');
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel'); 
  }
}
