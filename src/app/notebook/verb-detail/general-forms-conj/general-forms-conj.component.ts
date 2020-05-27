import { Component } from '@angular/core';
import { ConjComponent } from '../conj/conj.component';

@Component({
  selector: 'app-general-forms-conj',
  templateUrl: './general-forms-conj.component.html',
  styleUrls: ['./general-forms-conj.component.scss'],
})
export class GeneralFormsConjComponent extends ConjComponent {

  constructor() {
    super();
   }

  ngOnInit() {}
}
