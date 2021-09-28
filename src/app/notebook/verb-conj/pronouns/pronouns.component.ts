import { Component, Input, OnInit } from '@angular/core';
import { ConjTense } from '../../word.module';

@Component({
  selector: 'app-pronouns',
  templateUrl: './pronouns.component.html',
  styleUrls: ['./pronouns.component.scss'],
})
export class PronounsComponent implements OnInit {

  @Input() pronouns: string[];
  @Input() conjTense: ConjTense;
  pronounsToShow: string[];
  constructor() { }

  ngOnInit() {
    this.pronounsToShow = [];
    if(this.conjTense.conj.length === 6){
      this.pronounsToShow = [...this.pronouns];
    } else if (this.conjTense.conj.length === 2){
      this.pronounsToShow.push(this.pronouns[1]);
      this.pronounsToShow.push(this.pronouns[4]);
    } else {
      this.pronounsToShow.push('');
    }
  }

}
