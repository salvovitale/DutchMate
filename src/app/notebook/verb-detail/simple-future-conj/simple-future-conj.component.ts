import { Component } from '@angular/core';
import { ConjComponent } from '../conj/conj.component';

@Component({
  selector: 'app-simple-future-conj',
  templateUrl: './simple-future-conj.component.html',
  styleUrls: ['./simple-future-conj.component.scss'],
})
export class SimpleFutureConjComponent extends ConjComponent {

  constructor() {
    super();
   }

  ngOnChanges() {
    this.firstPersonSingular = 'zal ' + this.verb.word;
    this.secondPersonSingular = 'zult ' + this.verb.word;
    this.thirdPersonSingular = 'zal ' + this.verb.word;
    this.firstPersonPlural = this.secondPersonPlural = this.thirdPersonPlural = 'zullen ' + this.verb.word;
  }
}
