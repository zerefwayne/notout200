import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {MainComponent} from './main/main.component';
import {TestComponent} from './test/test.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: WelcomeComponent},
  {path: 'stats', component: MainComponent},
  {path: 'test', component: TestComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
