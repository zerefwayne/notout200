import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OverviewComponent} from './screens/overview/overview.component';
import {BattingComponent} from './screens/batting/batting.component';
import {BowlingComponent} from './screens/bowling/bowling.component';
import {GlobalComponent} from './screens/global/global.component';
import {WorldcupComponent} from './screens/worldcup/worldcup.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/overview'},
  {path: 'overview', component: OverviewComponent},
  {path: 'batting-wizard', component: BattingComponent},
  {path: 'a-handy-spinner', component: BowlingComponent},
  {path: 'global-phenomenon', component: GlobalComponent},
  {path: 'worldcup-maestro', component: WorldcupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
