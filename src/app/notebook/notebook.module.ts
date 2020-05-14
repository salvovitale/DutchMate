import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotebookPage } from './notebook.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NotebookPageRoutingModule } from './notebook-routing.module';
import { NewNounComponent } from './new-noun/new-noun.component';
import { NewVerbComponent } from './new-verb/new-verb.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NotebookPageRoutingModule,
  ],
  declarations: [NotebookPage, NewNounComponent, NewVerbComponent],
  entryComponents: [NewNounComponent, NewVerbComponent]
})
export class NotebookPageModule {}
