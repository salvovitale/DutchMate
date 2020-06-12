import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidator {
  multiWordsSpaceDashSeparatedValidator(event: any) {
    const pattern = /^[a-z\s-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-z\s-]/g, "");
    }
    event.target.value =  event.target.value.replace(/\s\s+/g, ' ');
  }

  multiWordsComaSeparatedValidator(event: any) {
    const pattern = /^[a-z,\s-()]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-z,\s-()]/g, "");
    }
    event.target.value =  event.target.value.replace(/\s\s+/g, ' ');
    event.target.value =  event.target.value.replace(/\s,+/g, ',');
    event.target.value =  event.target.value.replace(/,,+/g, ',');
  }

  singleWordValidator(event: any) {
    const pattern = /^[a-z']*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-z']/g, "");
    }
  }
}