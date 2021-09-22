import { Component, Input, OnInit } from '@angular/core';
import { ConjPerTime } from '../../word.module';

@Component({
  selector: 'app-pronouns',
  templateUrl: './pronouns.component.html',
  styleUrls: ['./pronouns.component.scss'],
})
export class PronounsComponent implements OnInit {

  @Input() conjPerTime: ConjPerTime;
  constructor() { }

  ngOnInit() {}

}
