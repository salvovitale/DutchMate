import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditVerbPageRoutingModule } from './edit-verb-routing.module';

import { EditVerbPage } from './edit-verb.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditVerbPageRoutingModule
  ],
  declarations: [EditVerbPage]
})
export class EditVerbPageModule {}
