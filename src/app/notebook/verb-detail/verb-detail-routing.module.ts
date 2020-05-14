import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerbDetailPage } from './verb-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VerbDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerbDetailPageRoutingModule {}
