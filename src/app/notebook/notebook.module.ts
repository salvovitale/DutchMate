import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotebookPage } from './notebook.page';

import { NotebookPageRoutingModule } from './notebook-routing.module';
import { NewNounComponent } from './new-noun/new-noun.component';
import { NewVerbComponent } from './new-verb/new-verb.component';
import { VerbConjComponent } from './verb-conj/verb-conj.component';
import { PronounsComponent } from './verb-conj/pronouns/pronouns.component';
import { ConjugationComponent } from './verb-conj/conjugation/conjugation.component';
import { NewWordComponent } from './new-word/new-word.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NotebookPageRoutingModule,
  ],
  declarations: [NotebookPage, NewWordComponent, NewNounComponent, NewVerbComponent, VerbConjComponent, PronounsComponent, ConjugationComponent],
  entryComponents: [NewWordComponent, NewNounComponent, NewVerbComponent, VerbConjComponent]
})
export class NotebookPageModule {}
