import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerbDetailPageRoutingModule } from './verb-detail-routing.module';

import { VerbDetailPage } from './verb-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerbDetailPageRoutingModule
  ],
  declarations: [VerbDetailPage]
})
export class VerbDetailPageModule {}
