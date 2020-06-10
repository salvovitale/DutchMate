import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InputValidator } from 'src/app/shared/util/inputValidator';
import { KindWord } from '../word.module';
import { WordInput } from '../wordInput.module';

@Component({
  selector: 'app-new-conj-prop',
  templateUrl: './new-conj-prop.component.html',
  styleUrls: ['./new-conj-prop.component.scss'],
})
export class NewConjPropComponent implements OnInit {

  @ViewChild('f', {static : true}) form: NgForm;
  conjOrProp: 'prop' | 'conj';

  constructor(
    private modalCtrl: ModalController,
    public inputValidator: InputValidator
  ) { }

  ngOnInit() {
    this.conjOrProp = 'prop';
  }

  onAddWord(){
    if(!this.form.valid){
      return;
    }
    let kind: KindWord;
    if(this.conjOrProp === 'prop'){
      kind = KindWord.Preposition;
    } else {
      kind = KindWord.Conjunction
    }
    const newConjPropInput = new WordInput(
      this.form.value['new-word'],
      this.form.value['translations'],
      kind,
      this.form.value['examples']
    );
    this.modalCtrl.dismiss({ newConjPropInput: newConjPropInput }, 'confirm');
  }

  onConjPropChange(event: any){
    if(!event.target.value){
      return;
    }
    this.conjOrProp= event.target.value;
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
