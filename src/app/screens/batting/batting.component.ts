import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Inning} from '../../services/inning.model';
import Chart from 'chart.js';
import colors from '../../shared/colors.model';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-batting',
  templateUrl: './batting.component.html',
  styleUrls: ['./batting.component.scss']
})
export class BattingComponent implements OnInit {

  @ViewChild('ninetiesChart') ninetiesChart: ElementRef;
  @ViewChild('averageByYearChart') averageChart: ElementRef;
  @ViewChild('runsByYearChart') runsChart: ElementRef;

  constructor(private dataService: DataService) { }

  private innings: Inning[] = [];

  ngOnInit() {
    this.innings = this.dataService.getAllInnings();
    this.generateNinetiesChart();
    this.generateAverageChart();
    this.generateRunsChart();
  }

  generateNinetiesChart() {
    this.ninetiesChart = new Chart(this.ninetiesChart.nativeElement, {

      type: 'scatter',
      data: {
        datasets: [{

          label: 'Runs',
          data: this.innings.map((inning: Inning, index: number) => {

            return {
              y: inning.batting_score,
              x: index+1
            }

          }),
          backgroundColor: this.innings.map((inning: Inning) => {

            if(inning.batting_score >= 90 && inning.batting_score < 100){
              return colors.colory;
            }
            return '#EEEEEE'
          }),
          pointRadius: this.innings.map((inning: Inning) => {

            if(inning.batting_score >= 90 && inning.batting_score < 100){
              return 4;
            }
            return 2;

          })


        }]
      }
    });
  }

  generateAverageChart() {

    let averageByYear = {};
    let overallAverage = 0;

    this.innings.forEach((inning: Inning) => {

      let year: number = inning.moment.get('year');

      if(averageByYear[year]) {

        averageByYear[year]['runs'] += inning.batting_score;

        if (inning.did_not_bat === 0) {

          averageByYear[year]['innings'] += 1;

          if(inning.notout === 1) {

            averageByYear[year]['notouts'] += 1;

          }

        }

        averageByYear[year]['average'] = _.round(averageByYear[year]['runs'] / (averageByYear[year]['innings'] - averageByYear[year]['notouts']), 2);


      } else {

        averageByYear[year] = {
          runs: 0,
          innings: 0,
          notouts: 0,
          average: 0
        };

        averageByYear[year]['runs'] += inning.batting_score;

        if (inning.did_not_bat === 0) {

          averageByYear[year]['innings'] += 1;

          if(inning.notout === 1) {

            averageByYear[year]['notouts'] += 1;

          }

        }

        averageByYear[year]['average'] = _.round(averageByYear[year]['runs'] / (averageByYear[year]['innings'] - averageByYear[year]['notouts']), 2);

      }

    });

    const array = Object.keys(averageByYear);
    const tempObject = {...averageByYear};

    array.forEach(country => {

      if(tempObject[country]['innings'] < 5){
        delete tempObject[country];
      }

    });

    this.averageChart = new Chart(this.averageChart.nativeElement, {

      type: 'line',
      data: {
        labels: Object.keys(tempObject),
        datasets: [
          {
            label: 'Averages By Year',
            data: Object.keys(tempObject).map((year) => {
                return tempObject[year]['average'];
            }),
            backgroundColor: Object.keys(tempObject).map((year) => {
              return year === '2001' ? colors.colory : colors.colorb
            }),
            fill: false,
            borderColor: colors.colorb

          }
        ]
      },
      options: {
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }



    });


  }

  generateRunsChart(){


    let runsByYear = {};

    this.innings.forEach((inning: Inning) => {

      let year: number = inning.moment.get('year');

      if(runsByYear[year] === undefined) {

        runsByYear[year] = 0;

      }

      runsByYear[year] += inning.batting_score;


    });

    this.runsChart = new Chart(this.runsChart.nativeElement, {

      type: 'line',
      data: {
        labels: Object.keys(runsByYear),
        datasets: [
          {
            label: 'Runs By Year',
            data: Object.keys(runsByYear).map((year) => {
              return runsByYear[year];
            }),
            fill: true,
            backgroundColor: 'rgba(12, 9, 13, .7)',
            borderColor: colors.colorb

          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        elements: {
          line: {
            tension: 0.2
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          text: 'Runs vs Year',
          fontSize: 18,
          position: 'bottom',
          padding: 10
        }
      }



    });



  }

}
