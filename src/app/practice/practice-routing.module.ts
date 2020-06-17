import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticePage } from './practice.page';

const routes: Routes = [
  {
    path: '',
    component: PracticePage,
  },
  {
    path: 'flashcards',
    loadChildren: () => import('./flashcards/flashcards.module').then( m => m.FlashcardsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
