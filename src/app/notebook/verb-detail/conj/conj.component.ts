import { Component, OnInit, Input } from '@angular/core';
import { Verb } from '../../word.module';

@Component({
  selector: 'app-conj',
  templateUrl: './conj.component.html',
  styleUrls: ['./conj.component.scss'],
})
export class  ConjComponent implements OnInit {

  @Input() verb: Verb;
  firstPersonSingular: string;
  secondPersonSingular: string;
  thirdPersonSingular: string;
  firstPersonPlural: string;
  secondPersonPlural: string;
  thirdPersonPlural: string;

  constructor() { }

  ngOnInit() {}
}
