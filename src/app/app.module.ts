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
import { StatTwoComponent } from './components/stat-two/stat-two.component';
import { StatOneComponent } from './components/stat-one/stat-one.component';
import {HttpClientModule} from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    OverviewComponent,
    BattingComponent,
    BowlingComponent,
    WorldcupComponent,
    GlobalComponent,
    StatTwoComponent,
    StatOneComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
