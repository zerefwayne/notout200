import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {DataService} from '../../services/data.service';
import {Inning} from '../../services/inning.model';
import * as _ from 'lodash';
import Chart from 'chart.js';
import colors from '../../shared/colors.model';

@Component({
  selector: 'app-worldcup',
  templateUrl: './worldcup.component.html',
  styleUrls: ['./worldcup.component.scss']
})
export class WorldcupComponent implements OnInit {

  @ViewChild('overallInningsChart') overallChart: ElementRef;
  @ViewChild('runsByResultChart') runsByResultChart: ElementRef;
  @ViewChild('centuriesByResultChart') centuriesByResultChart: ElementRef;
  @ViewChild('runsByInningsChart') runsByInningsChart: ElementRef;

  worldCupDates = {
    "1992": {
      "start": moment('22 Feb 1992', 'DD MMM YYYY').startOf('day'),
      "end": moment('25 Mar 1992', 'DD MMM YYYY').endOf('day')
    },
    "1996": {
      "start": moment('14 Feb 1996', 'DD MMM YYYY').startOf('day'),
      "end": moment('17 Mar 1996', 'DD MMM YYYY').endOf('day')
    },
    "1999": {
      "start": moment('14 May 1999', 'DD MMM YYYY').startOf('day'),
      "end": moment('20 Jun 1999', 'DD MMM YYYY').endOf('day')
    },
    "2003": {
      "start": moment('9 Feb 2003', 'DD MMM YYYY').startOf('day'),
      "end": moment('24 Mar 2003', 'DD MMM YYYY').endOf('day')
    },
    "2007": {
      "start": moment('13 Mar 2007', 'DD MMM YYYY').startOf('day'),
      "end": moment('28 Apr 2007', 'DD MMM YYYY').endOf('day')
    },
    "2011": {
      "start": moment('19 Feb 2011', 'DD MMM YYYY').startOf('day'),
      "end": moment('02 Apr 2011', 'DD MMM YYYY').endOf('day')
    },
  };

  overall =  {
    inningsObjects: [],
    runs: 0,
    innings: 0,
    not_outs: 0,
    average: 0,
  };

  statsByYear = {};

  constructor(private dataService: DataService) { }

  ngOnInit() {

    Object.keys(this.worldCupDates).forEach(date => {

      this.statsByYear[date] = {
        inningsObjects: [],
        runs: 0,
        innings: 0,
        not_outs: 0,
        average: 0,
      };

      let start = this.worldCupDates[date].start;
      let end = this.worldCupDates[date].end;

      this.dataService.getInningsBetween(start, end).forEach((inning: Inning) => {

        if(inning.did_not_bat === 0){

          this.overall.inningsObjects.push(inning);
          this.statsByYear[date].inningsObjects.push(inning);

          this.overall.runs += inning.batting_score;
          this.statsByYear[date].runs += inning.batting_score;

          this.overall.innings += 1;
          this.statsByYear[date].innings += 1;

          if(inning.notout === 1){

            this.overall.not_outs += 1;
            this.statsByYear[date].not_outs += 1;

          }

        }

      });

      this.statsByYear[date].average = _.round( this.statsByYear[date].runs / (this.statsByYear[date].innings - this.statsByYear[date].not_outs), 2);

    });

    this.overall.average = _.round(this.overall.runs / (this.overall.innings - this.overall.not_outs), 2);

    this.generateOverallInningsChart();
    this.generateRunsByResultChart();
    this.generateCenturiesByResultChart();
    //this.generateRunsByInningsChart();

  }

  generateOverallInningsChart() {

      const runsPerWC: number[] = [];

      Object.keys(this.statsByYear).forEach(year => {

        runsPerWC.push(this.statsByYear[year]['runs']);

      });


      this.overallChart = new Chart(this.overallChart.nativeElement, {

        type: 'bar',
        data: {
          labels: Object.keys(this.statsByYear),
          datasets: [
            {
              label: 'Runs scored',
              data: runsPerWC,
              backgroundColor: [
                colors.colorb,
                colors.colorb,
                colors.colorb,
                colors.colorp,
                colors.colorb,
                colors.colory,
              ]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Runs scored in each World Cup',
            fontSize: 20,
            position: 'bottom',
            padding: 30
          }
        }

      });



  }

  generateRunsByResultChart() {

    const runs_vs_result = [0, 0, 0]; //0 = win //1 = loss //2= n/r

    this.overall.inningsObjects.forEach((inning: Inning) => {

      if(inning.match_result == 'won'){

        runs_vs_result[0] += inning.batting_score;

      } else if (inning.match_result == 'lost') {

        runs_vs_result[1] += inning.batting_score;

      } else {
        runs_vs_result[2] += inning.batting_score;
      }

    });

    this.runsByResultChart = new Chart(this.runsByResultChart.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ['Win', 'Loss', 'Tied/NR'],
        datasets: [
          {
            label: 'Runs scored',
            data: runs_vs_result,
            backgroundColor: [
              colors.colory,
              colors.colorb,
              '#666666'
            ]
          }
        ]
      },
      options: {
        legend: {
          display: true
        }
      }

    });

  }

  generateCenturiesByResultChart() {

    const centuries_vs_result = [0, 0, 0]; //0 = win //1 = loss //2= n/r

    this.overall.inningsObjects.forEach((inning: Inning) => {

      if(inning.batting_score >= 100) {

        if (inning.match_result == 'won') {

          centuries_vs_result[0] += 1;

        } else if (inning.match_result == 'lost') {

          centuries_vs_result[1] += 1;

        } else {
          centuries_vs_result[2] += 1;
        }

      }

    });

    this.centuriesByResultChart = new Chart(this.centuriesByResultChart.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ['Win', 'Loss', 'Tied/NR'],
        datasets: [
          {
            label: 'Runs scored',
            data: centuries_vs_result,
            backgroundColor: [
              colors.colory,
              colors.colorb,
              '#666666'
            ]
          }
        ]
      },
      options: {
        legend: {
          display: true
        }
      }

    });

  }

  generateRunsByInningsChart() {

    const runs_by_innings = [0, 0]; //0 = 1st 1 = 2nd

    this.overall.inningsObjects.forEach((inning: Inning) => {

      if(inning.match_result === 'won') {

        if (inning.batting_innings == 1) {

          runs_by_innings[0] += inning.batting_score;

        } else if (inning.batting_innings == 2) {

          runs_by_innings[1] += inning.batting_score;

        }

      }

    });

    this.runsByInningsChart= new Chart(this.runsByInningsChart.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ['1st', '2nd'],
        datasets: [
          {
            label: 'Runs scored',
            data: runs_by_innings,
            backgroundColor: [
              colors.colory,
              colors.colorr,
            ]
          }
        ]
      },
      options: {
        legend: {
          display: true
        }
      }

    });

  }


}
