import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayingComponent } from './playing/playing.component';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './main.component';
import {} from './view';
import { ViewerComponent } from './viewer/viewer.conponent';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'playing',
        component: PlayingComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path:'viewer',
        component:ViewerComponent
      },
      {
        path: '',
        redirectTo: 'playing',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}

export const routedComponents = [MainComponent];
