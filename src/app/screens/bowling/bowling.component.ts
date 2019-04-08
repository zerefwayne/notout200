import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Inning} from '../../services/inning.model';
import * as _ from 'lodash';
import colors from '../../shared/colors.model';
import Chart from 'chart.js';
import {del} from 'selenium-webdriver/http';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.scss']
})
export class BowlingComponent implements OnInit {

  @ViewChild('wicketsByOpposition') wicketsChart: ElementRef;
  @ViewChild('catchesChart') catchesChart: ElementRef;

  constructor(private dataService: DataService, private breakpointObserver: BreakpointObserver) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  private innings: Inning[] = [];
  totalWickets: number = 0;
  totalCatches: number = 0;


  ngOnInit() {
    this.innings = this.dataService.getAllInnings();
    this.generateWicketsChart();
    this.generateCatchesChart();


  }

  async generateWicketsChart() {

    let wicketsByOpposition = {};

    this.innings.forEach((inning: Inning) => {
      if(inning.did_bowl){
        this.totalWickets +=  (+inning.wickets);
        if(wicketsByOpposition[inning.opposition.toUpperCase()]){
          wicketsByOpposition[inning.opposition.toUpperCase()] += inning.wickets
        } else {
          wicketsByOpposition[inning.opposition.toUpperCase()] = inning.wickets
        }
      }
    });

    const filterArray = Object.keys(wicketsByOpposition);

    filterArray.forEach((country) => {

      if(wicketsByOpposition[country] < 3){
        delete wicketsByOpposition[country];
      }

    });

    this.wicketsChart = new Chart(this.wicketsChart.nativeElement, {

      type: 'horizontalBar',
      data: {
        labels: Object.keys(wicketsByOpposition),
        datasets: [
          {
            label: 'Wickets',
            data: Object.keys(wicketsByOpposition).map((opposition) => {
              return wicketsByOpposition[opposition];
            }),
            backgroundColor: Object.keys(wicketsByOpposition).map(opposition => opposition === 'PAKISTAN' ? colors.colory : colors.colorb)

          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Wickets taken vs Oppositions',
          fontSize: 18,
          position: 'bottom',
          padding: 30
        }
      }

    });


  }

  generateCatchesChart() {

    let catchesByOpposition = {};

    this.innings.forEach((inning: Inning) => {
      if( _.isNumber(inning.catches)){

        this.totalCatches += inning.catches;

        if(catchesByOpposition[inning.opposition.toUpperCase()]){
          catchesByOpposition[inning.opposition.toUpperCase()] += inning.catches
        } else {
          catchesByOpposition[inning.opposition.toUpperCase()] = inning.catches
        }

      }

    });

    this.catchesChart = new Chart(this.catchesChart.nativeElement, {

      type: 'doughnut',
      data: {
        labels: Object.keys(catchesByOpposition),
        datasets: [
          {
            label: 'Wickets',
            data: Object.keys(catchesByOpposition).map((opposition) => {
              return catchesByOpposition[opposition];
            }),
            backgroundColor: Object.keys(catchesByOpposition).map(opposition => opposition === 'AUSTRALIA' ? colors.colory : colors.colorb)
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }

    });


  }

}
