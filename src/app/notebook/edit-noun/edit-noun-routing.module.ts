import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNounPage } from './edit-noun.page';

const routes: Routes = [
  {
    path: '',
    component: EditNounPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNounPageRoutingModule {}
