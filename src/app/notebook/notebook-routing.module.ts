import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotebookPage } from './notebook.page';

const routes: Routes = [
  {
    path: '**',
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
    path: 'verbs/:verbId',
    loadChildren: () => import('./verb-detail/verb-detail.module').then( m => m.VerbDetailPageModule)
  },
  {
    path: 'verbs/edit/:verbId',
    loadChildren: () => import('./edit-verb/edit-verb.module').then( m => m.EditVerbPageModule)
  },
  {
    path: 'adjectives/:adjId',
    loadChildren: () => import('./adjective-detail/adjective-detail.module').then( m => m.AdjectiveDetailPageModule)
  },
  {
    path: 'adverbs/:advId',
    loadChildren: () => import('./adverb-detail/adverb-detail.module').then( m => m.AdverbDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotebookPageRoutingModule {}
