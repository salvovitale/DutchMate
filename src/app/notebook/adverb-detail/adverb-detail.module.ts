import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdverbDetailPageRoutingModule } from './adverb-detail-routing.module';

import { AdverbDetailPage } from './adverb-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdverbDetailPageRoutingModule
  ],
  declarations: [AdverbDetailPage]
})
export class AdverbDetailPageModule {}
