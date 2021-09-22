import { Component, Input, OnInit } from '@angular/core';
import { ConjPerTime } from '../../word.module';

@Component({
  selector: 'app-conjugation',
  templateUrl: './conjugation.component.html',
  styleUrls: ['./conjugation.component.scss'],
})
export class ConjugationComponent implements OnInit {

  @Input() conjPerTime: ConjPerTime;
  constructor() { }

  ngOnInit() {}

}
