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
    path: 'adjectives/edit/:adjId',
    loadChildren: () => import('./edit-adjective/edit-adjective.module').then( m => m.EditAdjectivePageModule)
  },
  {
    path: 'words/:wordId/kind/:kindId',
    loadChildren: () => import('./word-detail/word-detail.module').then( m => m.WordDetailPageModule)
  },
  {
    path: 'words/edit/:wordId/kind/:kindId',
    loadChildren: () => import('./edit-word/edit-word.module').then( m => m.EditWordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotebookPageRoutingModule {}
