import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAdjectivePageRoutingModule } from './edit-adjective-routing.module';

import { EditAdjectivePage } from './edit-adjective.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditAdjectivePageRoutingModule
  ],
  declarations: [EditAdjectivePage]
})
export class EditAdjectivePageModule {}
