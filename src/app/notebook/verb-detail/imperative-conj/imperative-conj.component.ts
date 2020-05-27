import { Component } from '@angular/core';
import { PresentConjComponent } from '../present-conj/present-conj.component';

@Component({
  selector: 'app-imperative-conj',
  templateUrl: './imperative-conj.component.html',
  styleUrls: ['./imperative-conj.component.scss'],
})
export class ImperativeConjComponent extends PresentConjComponent {

  constructor() {
    super()
  }

  ngOnInit() {}

  ngOnChanges(){
    super.ngOnChanges();
  }
}