import { Component, OnInit } from '@angular/core';
import { ConjComponent } from '../conj/conj.component';

@Component({
  selector: 'app-simple-past-conj',
  templateUrl: './simple-past-conj.component.html',
  styleUrls: ['./simple-past-conj.component.scss'],
})
export class SimplePastConjComponent extends ConjComponent {

  constructor() {
    super();
   }

   ngOnChanges() {
    this.firstPersonSingular = this.secondPersonSingular = this.thirdPersonSingular = this.verb.firstPersonPastSingular;
    this.firstPersonPlural = this.secondPersonPlural = this.thirdPersonPlural = this.verb.firstPersonPastPlural;
  }
}
