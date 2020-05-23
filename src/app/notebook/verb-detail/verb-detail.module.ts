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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerbDetailPageRoutingModule
  ],
  declarations: [VerbDetailPage, PersonalPronounsComponent, PresentConjComponent, PresentPerfectConjComponent, SimplePastConjComponent, PastPerfectConjComponent]
})
export class VerbDetailPageModule {}
