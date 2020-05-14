import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotebookPage } from './notebook.page';

const routes: Routes = [
  {
    path: '',
    component: NotebookPage,
  },
  {
    path: 'nouns/:nounId',
    loadChildren: () => import('./noun-detail/noun-detail.module').then( m => m.NounDetailPageModule)
  },
  {
    path: 'nouns/edit/:nounId',
    loadChildren: () => import('./edit-noun/edit-noun.module').then( m => m.EditNounPageModule)
  },
  {
    path: 'verb-detail',
    loadChildren: () => import('./verb-detail/verb-detail.module').then( m => m.VerbDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotebookPageRoutingModule {}
