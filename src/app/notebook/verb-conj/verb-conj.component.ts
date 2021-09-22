import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EntireConjugation } from '../word.module';

@Component({
  selector: 'app-verb-conj',
  templateUrl: './verb-conj.component.html',
  styleUrls: ['./verb-conj.component.scss'],
})
export class VerbConjComponent implements OnInit {

  @Input() entireConj: EntireConjugation;
  showMore = false;
  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.entireConj);
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onShowMore(){
    this.showMore = !this.showMore;
  }
}
