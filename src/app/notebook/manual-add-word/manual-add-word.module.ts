import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualAddWordPageRoutingModule } from './manual-add-word-routing.module';

import { ManualAddWordPage } from './manual-add-word.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualAddWordPageRoutingModule
  ],
  declarations: [ManualAddWordPage]
})
export class ManualAddWordPageModule {}
