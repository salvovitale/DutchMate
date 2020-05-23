import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditVerbPage } from './edit-verb.page';

const routes: Routes = [
  {
    path: '',
    component: EditVerbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditVerbPageRoutingModule {}
