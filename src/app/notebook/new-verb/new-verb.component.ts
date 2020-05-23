import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
    public inputValidator: InputValidator
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

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
