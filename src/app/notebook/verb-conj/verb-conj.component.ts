import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EntireConj } from '../word.module';

@Component({
  selector: 'app-verb-conj',
  templateUrl: './verb-conj.component.html',
  styleUrls: ['./verb-conj.component.scss'],
})
export class VerbConjComponent implements OnInit {

  @Input() entireConj: EntireConj;
  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
