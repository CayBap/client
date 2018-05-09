import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.module';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ViewerComponent } from './viewer/viewer.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'scoreboard',
    component: ScoreboardComponent
  },
  {
    path: 'viewer',
    component: ViewerComponent
  },
  {
    path: 'main',
    loadChildren: './main/main.module#MainModule'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
