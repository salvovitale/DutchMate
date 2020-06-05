import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdverbDetailPage } from './adverb-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AdverbDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdverbDetailPageRoutingModule {}
