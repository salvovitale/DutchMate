import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditWordPage } from './edit-word.page';

const routes: Routes = [
  {
    path: '',
    component: EditWordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditWordPageRoutingModule {}
