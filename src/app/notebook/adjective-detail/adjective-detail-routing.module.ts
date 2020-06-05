import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdjectiveDetailPage } from './adjective-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AdjectiveDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdjectiveDetailPageRoutingModule {}
