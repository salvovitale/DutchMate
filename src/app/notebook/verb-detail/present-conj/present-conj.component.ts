import { Component } from '@angular/core';
import { ConjComponent } from '../conj/conj.component';

@Component({
  selector: 'app-present-conj',
  templateUrl: './present-conj.component.html',
  styleUrls: ['./present-conj.component.scss'],
})
export class PresentConjComponent extends ConjComponent {

  constructor() {
    super();
  }

  ngOnChanges() {
    const verbWords = this.verb.firstPersonPresent.split(' ');
    this.firstPersonSingular = this.verb.firstPersonPresent;
    let suffix = 't';
    if(this.verb.word.substring(this.verb.word.length - 3) === 'aan'){
      suffix = 'at'
    }
    if(this.verb.firstPersonPresent.substring(this.verb.firstPersonPresent.length - 1) === 't'){
      suffix = ''
    }
    if(verbWords.length < 2){
      this.secondPersonSingular = this.thirdPersonSingular = this.verb.firstPersonPresent + suffix;
      this.firstPersonPlural = this.secondPersonPlural = this.thirdPersonPlural = this.verb.word;
    } else {
      this.secondPersonSingular = this.thirdPersonSingular =  verbWords[0] + suffix+ ' ' + verbWords[1];
      this.firstPersonPlural = this.secondPersonPlural = this.thirdPersonPlural = this.verb.word.substring(verbWords[1].length) + ' ' + verbWords[1];
    }
  }

}
