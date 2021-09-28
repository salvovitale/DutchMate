import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchWordPage } from './search-word.page';

const routes: Routes = [
  {
    path: '',
    component: SearchWordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchWordPageRoutingModule {}
