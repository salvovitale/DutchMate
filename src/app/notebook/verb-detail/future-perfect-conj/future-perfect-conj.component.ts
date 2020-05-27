import { Component, OnInit } from '@angular/core';
import { ConjComponent } from '../conj/conj.component';

@Component({
  selector: 'app-future-perfect-conj',
  templateUrl: './future-perfect-conj.component.html',
  styleUrls: ['./future-perfect-conj.component.scss'],
})
export class FuturePerfectConjComponent extends ConjComponent {

  constructor() {
    super();
   }

  ngOnChanges() {
    this.firstPersonSingular = 'zal ' + this.verb.pastParticiple + ' ' + this.verb.auxVerb;
    this.secondPersonSingular = 'zult ' + this.verb.pastParticiple + ' ' + this.verb.auxVerb;
    this.thirdPersonSingular = 'zal ' + this.verb.pastParticiple + ' ' + this.verb.auxVerb;
    this.firstPersonPlural = this.secondPersonPlural = this.thirdPersonPlural = 'zullen ' + this.verb.pastParticiple + ' ' + this.verb.auxVerb;
  }
}
