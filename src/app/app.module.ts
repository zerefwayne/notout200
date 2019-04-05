import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from './services/data.service';
import {MaterialModule} from './material.module';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { OverviewComponent } from './screens/overview/overview.component';
import { BattingComponent } from './screens/batting/batting.component';
import { BowlingComponent } from './screens/bowling/bowling.component';
import { WorldcupComponent } from './screens/worldcup/worldcup.component';
import { GlobalComponent } from './screens/global/global.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    OverviewComponent,
    BattingComponent,
    BowlingComponent,
    WorldcupComponent,
    GlobalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
