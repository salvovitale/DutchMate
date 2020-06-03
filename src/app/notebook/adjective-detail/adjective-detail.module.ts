import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdjectiveDetailPageRoutingModule } from './adjective-detail-routing.module';

import { AdjectiveDetailPage } from './adjective-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdjectiveDetailPageRoutingModule
  ],
  declarations: [AdjectiveDetailPage]
})
export class AdjectiveDetailPageModule {}
