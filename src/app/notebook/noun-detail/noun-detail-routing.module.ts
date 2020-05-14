import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NounDetailPage } from './noun-detail.page';

const routes: Routes = [
  {
    path: '',
    component: NounDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NounDetailPageRoutingModule {}
