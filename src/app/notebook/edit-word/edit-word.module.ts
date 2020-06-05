import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditWordPageRoutingModule } from './edit-word-routing.module';

import { EditWordPage } from './edit-word.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditWordPageRoutingModule
  ],
  declarations: [EditWordPage]
})
export class EditWordPageModule {}
