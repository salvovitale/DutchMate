import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerbDetailPageRoutingModule } from './verb-detail-routing.module';

import { VerbDetailPage } from './verb-detail.page';
import { PersonalPronounsComponent } from './personal-pronouns/personal-pronouns.component';
import { PresentConjComponent } from './present-conj/present-conj.component';
import { PresentPerfectConjComponent } from './present-perfect-conj/present-perfect-conj.component';
import { SimplePastConjComponent } from './simple-past-conj/simple-past-conj.component';
import { PastPerfectConjComponent } from './past-perfect-conj/past-perfect-conj.component';
import { SimpleFutureConjComponent } from './simple-future-conj/simple-future-conj.component';
import { FuturePerfectConjComponent } from './future-perfect-conj/future-perfect-conj.component';
import { ConditionalPresentConjComponent } from './conditional-present-conj/conditional-present-conj.component';
import { ConditionalPastConjComponent } from './conditional-past-conj/conditional-past-conj.component';
import { ImperativeConjComponent } from './imperative-conj/imperative-conj.component';
import { ImperativePronounsComponent } from './imperative-pronouns/imperative-pronouns.component';
import { GeneralFormsComponent } from './general-forms/general-forms.component';
import { GeneralFormsConjComponent } from './general-forms-conj/general-forms-conj.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerbDetailPageRoutingModule
  ],
  declarations: [VerbDetailPage, PersonalPronounsComponent, PresentConjComponent,
                 PresentPerfectConjComponent, SimplePastConjComponent, PastPerfectConjComponent,
                 SimpleFutureConjComponent, FuturePerfectConjComponent,
                 ConditionalPresentConjComponent, ConditionalPastConjComponent,
                 ImperativePronounsComponent, ImperativeConjComponent,
                 GeneralFormsComponent, GeneralFormsConjComponent]
})
export class VerbDetailPageModule {}