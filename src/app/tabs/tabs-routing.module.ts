import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'notebook',
        loadChildren: () => import('../notebook/notebook.module').then(m => m.NotebookPageModule)
      },
      {
        path: 'practice',
        loadChildren: () => import('../practice/practice.module').then(m => m.PracticePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/notebook',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
