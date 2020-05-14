import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NounDetailPageRoutingModule } from './noun-detail-routing.module';

import { NounDetailPage } from './noun-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NounDetailPageRoutingModule
  ],
  declarations: [NounDetailPage]
})
export class NounDetailPageModule {}
