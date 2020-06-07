import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAdjectivePage } from './edit-adjective.page';

const routes: Routes = [
  {
    path: '',
    component: EditAdjectivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAdjectivePageRoutingModule {}
