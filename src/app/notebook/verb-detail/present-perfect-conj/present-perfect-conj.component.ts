import { Component, OnInit } from '@angular/core';
import { ConjComponent } from '../conj/conj.component';

@Component({
  selector: 'app-present-perfect-conj',
  templateUrl: './present-perfect-conj.component.html',
  styleUrls: ['./present-perfect-conj.component.scss'],
})
export class PresentPerfectConjComponent extends ConjComponent {

  constructor() {
    super();
   }

  ngOnChanges() {
    this.firstPersonSingular = ((this.verb.auxVerb === 'zijn') ? 'ben ' : 'heb ') + this.verb.pastParticiple;
    this.secondPersonSingular = ((this.verb.auxVerb === 'zijn') ? 'bent ' : 'hebt ') + this.verb.pastParticiple;
    this.thirdPersonSingular = ((this.verb.auxVerb === 'zijn') ? 'is  ' : 'heeft ') + this.verb.pastParticiple;
    this.firstPersonPlural = ((this.verb.auxVerb === 'zijn') ? 'zijn ' : 'hebben ') + this.verb.pastParticiple;
    this.secondPersonPlural = ((this.verb.auxVerb === 'zijn') ? 'zijn ' : 'hebben ') + this.verb.pastParticiple;
    this.thirdPersonPlural = ((this.verb.auxVerb === 'zijn') ? 'zijn ' : 'hebben ') + this.verb.pastParticiple;
  }

}
