import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNounPageRoutingModule } from './edit-noun-routing.module';

import { EditNounPage } from './edit-noun.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditNounPageRoutingModule
  ],
  declarations: [EditNounPage]
})
export class EditNounPageModule {}
