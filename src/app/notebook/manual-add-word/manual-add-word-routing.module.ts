import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualAddWordPage } from './manual-add-word.page';

const routes: Routes = [
  {
    path: '',
    component: ManualAddWordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualAddWordPageRoutingModule {}
