import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchWordPageRoutingModule } from './search-word-routing.module';

import { SearchWordPage } from './search-word.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchWordPageRoutingModule
  ],
  declarations: [SearchWordPage]
})
export class SearchWordPageModule {}
