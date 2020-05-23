import { Component, OnInit } from '@angular/core';
import { ConjComponent } from '../conj/conj.component';

@Component({
  selector: 'app-past-perfect-conj',
  templateUrl: './past-perfect-conj.component.html',
  styleUrls: ['./past-perfect-conj.component.scss'],
})
export class PastPerfectConjComponent extends ConjComponent {

  constructor() {
    super();
   }

   ngOnChanges() {
   this.firstPersonSingular = ((this.verb.auxVerb === 'zijn') ? 'was ' : 'had ') + this.verb.pastParticiple;
   this.secondPersonSingular = ((this.verb.auxVerb === 'zijn') ? 'was ' : 'had ') + this.verb.pastParticiple;
   this.thirdPersonSingular = ((this.verb.auxVerb === 'zijn') ? 'was  ' : 'had ') + this.verb.pastParticiple;
   this.firstPersonPlural = ((this.verb.auxVerb === 'zijn') ? 'waren ' : 'hadden ') + this.verb.pastParticiple;
   this.secondPersonPlural = ((this.verb.auxVerb === 'zijn') ? 'waren ' : 'hadden ') + this.verb.pastParticiple;
   this.thirdPersonPlural = ((this.verb.auxVerb === 'zijn') ? 'waren ' : 'hadden ') + this.verb.pastParticiple;
  }

}
