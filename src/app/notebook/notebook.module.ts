import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotebookPage } from './notebook.page';

import { NotebookPageRoutingModule } from './notebook-routing.module';
import { NewNounComponent } from './new-noun/new-noun.component';
import { NewVerbComponent } from './new-verb/new-verb.component';
import { NewAdjAdvComponent } from './new-adj-adv/new-adj-adv.component';
import { NewConjPropComponent } from './new-conj-prop/new-conj-prop.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NotebookPageRoutingModule,
  ],
  declarations: [NotebookPage, NewNounComponent, NewVerbComponent, NewAdjAdvComponent, NewConjPropComponent],
  entryComponents: [NewNounComponent, NewVerbComponent, NewAdjAdvComponent, NewConjPropComponent]
})
export class NotebookPageModule {}
