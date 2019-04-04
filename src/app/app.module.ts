import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { WelcomeComponent } from './welcome/welcome.component';
import { MainComponent } from './main/main.component';
import { LineChartDirective } from './directives/line-chart.directive';
import { BarChartDirective } from './directives/bar-chart.directive';
import { RadarChartDirective } from './directives/radar-chart.directive';
import { PieChartDirective } from './directives/pie-chart.directive';
import { BubbleChartDirective } from './directives/bubble-chart.directive';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MainComponent,
    BarChartDirective,
    LineChartDirective,
    RadarChartDirective,
    PieChartDirective,
    BubbleChartDirective,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
