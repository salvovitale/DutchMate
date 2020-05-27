import { Component, OnInit } from '@angular/core';
import { ConjComponent } from '../conj/conj.component';

@Component({
  selector: 'app-conditional-present-conj',
  templateUrl: './conditional-present-conj.component.html',
  styleUrls: ['./conditional-present-conj.component.scss'],
})
export class ConditionalPresentConjComponent extends ConjComponent {

  constructor() {
    super();
   }

  ngOnChanges() {
    this.firstPersonSingular = this.secondPersonSingular = this.thirdPersonSingular = 'zou ' + this.verb.word;
    this.firstPersonPlural = this.secondPersonPlural = this.thirdPersonPlural = 'zouden ' + this.verb.word;
  }

}
