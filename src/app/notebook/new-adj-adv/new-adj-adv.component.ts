import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InputValidator } from 'src/app/shared/util/inputValidator';
import { KindWord } from '../word.module';
import { AdjectiveInput, AdverbInput } from '../wordInput.module';

@Component({
  selector: 'app-new-adj-adv',
  templateUrl: './new-adj-adv.component.html',
  styleUrls: ['./new-adj-adv.component.scss'],
})
export class NewAdjAdvComponent implements OnInit {

  @ViewChild('f', {static : true}) form: NgForm;
  adjOrAdv: 'adj' | 'adv';
  isAdjAlsoAdv: 'yes' | 'no';
  constructor(
    private modalCtrl: ModalController,
    public inputValidator: InputValidator
  ) { }

  ngOnInit() {
    this.adjOrAdv = 'adj';
    this.isAdjAlsoAdv = 'no';
  }

  onAddWord(){
    if(!this.form.valid){
      return;
    }
    if(this.adjOrAdv === 'adj'){
      const newAdjectiveInputData = new AdjectiveInput(
        this.form.value['new-word'],
        this.form.value['translations'],
        KindWord.Adjective,
        this.form.value['examples'],
        this.form.value['e-form'],
        this.isAdjAlsoAdv === 'yes',
        this.form.value['adverb-translations'],
      );
      this.modalCtrl.dismiss({ newAdjectiveInputData: newAdjectiveInputData }, 'adjective');
    } else {
      const newAdverbInputData = new AdverbInput(
        this.form.value['new-word'],
        this.form.value['translations'],
        KindWord.Adverb,
        this.form.value['examples']
      );
      this.modalCtrl.dismiss({ newAdverbInputData: newAdverbInputData }, 'adverb');
    }
  }

  onAdjAdvChange(event: any){
    if(!event.target.value){
      return;
    }
    this.adjOrAdv= event.target.value;
  }

  onIsAdjAlsoAdvChange(event: any){
    if(!event.target.value){
      return;
    }
    this.isAdjAlsoAdv= event.target.value;
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
