import { Component, OnInit } from '@angular/core';
import { ConjComponent } from '../conj/conj.component';

@Component({
  selector: 'app-conditional-past-conj',
  templateUrl: './conditional-past-conj.component.html',
  styleUrls: ['./conditional-past-conj.component.scss'],
})
export class ConditionalPastConjComponent extends ConjComponent {

  constructor() {
    super();
   }

  ngOnChanges() {
    this.firstPersonSingular = this.secondPersonSingular = this.thirdPersonSingular = 'zou ' + this.verb.pastParticiple + ' ' + this.verb.auxVerb;
    this.firstPersonPlural = this.secondPersonPlural = this.thirdPersonPlural = 'zouden ' + this.verb.pastParticiple + ' ' + this.verb.auxVerb;
  }

}
