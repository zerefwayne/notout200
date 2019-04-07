import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import colors from '../../shared/colors.model';
import * as Datamap from "node_modules/datamaps/dist/datamaps.world.min.js";
import {DataService} from '../../services/data.service';
import {Inning} from '../../services/inning.model';
import * as _ from 'lodash';
import Chart from 'chart.js';

let map;

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})

export class GlobalComponent implements OnInit {

  @ViewChild('worldmap') worldMap: ElementRef;
  @ViewChild('countryWiseChart') countryWiseChart: ElementRef;
  @ViewChild('countryAverageChart') countryAverageChart: ElementRef;
  @ViewChild('runsWinContribution') rwChart: ElementRef;
  @ViewChild('centuriesWinContribution') cwChart: ElementRef;

  private innings: Inning[] = [];
  private countryMapFill: {} = {};
  private countryData: {} = {};
  awayRecord: {runs: number, innings: number, notouts: number, average: number, centuries: number};


  constructor(private dataService: DataService) { }

  getColor(code: string): string {

      console.log(this.countryData);

      if(code === 'IND'){
        return 'home';
      }

      if(this.countryData[code].runs > 1500){
        return 'g1500';
      } else if (this.countryData[code].runs > 1000){
        return 'l1500';
      } else if (this.countryData[code].runs > 500){
        return 'l1000';
      }

      return 'l500';

  }

  ngOnInit() {

    this.awayRecord = {
      runs: 0,
      innings: 0,
      notouts: 0,
      average: 0,
      centuries: 0
    };

    this.innings = this.dataService.getAllInnings();

    this.innings.forEach((inning: Inning) => {

      if(inning.countryCode !== 'IND') {

        if (this.countryData[inning.countryCode] === undefined) {

          this.countryData[inning.countryCode] = {
            countryName: inning.countryName,
            runs: 0,
            innings: 0,
            notouts: 0,
            average: 0
          };

        }

          if (inning.did_not_bat === 0) {

            if(inning.batting_score >= 100){
              this.awayRecord.centuries += 1;
            }

            this.countryData[inning.countryCode].runs += inning.batting_score;

            this.countryData[inning.countryCode].innings += 1;

            if (inning.notout === 1) {

              this.countryData[inning.countryCode].notouts += 1;

            }

            if (this.countryData[inning.countryCode].innings - this.countryData[inning.countryCode].notouts !== 0) {

              this.countryData[inning.countryCode].average = _.round(this.countryData[inning.countryCode].runs / (this.countryData[inning.countryCode].innings - this.countryData[inning.countryCode].notouts), 2);

            }

          }


      }

    });

    this.innings.forEach((inning: Inning) => {

      if(this.countryMapFill[inning.countryCode] === undefined){
        this.countryMapFill[inning.countryCode] = { fillKey: this.getColor(inning.countryCode), name: inning.countryName };
      }

    });

     Object.keys(this.countryData).forEach((country) => {

      let data = this.countryData[country];

      this.awayRecord.runs += this.countryData[country].runs;
      this.awayRecord.innings += this.countryData[country].innings;
      this.awayRecord.notouts += this.countryData[country].notouts;

      this.awayRecord.average = _.round( this.awayRecord.runs / (this.awayRecord.innings - this.awayRecord.notouts), 2);

    });



    map = new Datamap({
      element: this.worldMap.nativeElement,
      projection: 'mercator',
      geographyConfig: {
        popupOnHover: true,
      },
      fills: {
        defaultFill: '#CCCCCC',
        authorHasTraveledTo: colors.colory,
        home: colors.colorb,
        g1500: '#BE943A',
        l1500: '#E7B446',
        l1000: '#EDC878',
        l500: '#F4DCAA',

      },data: this.countryMapFill
    });

    this.generateCountryChart();
    this.generateAverageChart();
    this.generateRunWinAwayChart();
    this.generateCenturiesWinAwayChart();

  }

  generateCountryChart(){

    // FILTER FUNCTION - To remove countries where runs less than 100

    const array = Object.keys(this.countryData);

    const tempCountryData = {...this.countryData};

    array.forEach(country => {

      if(tempCountryData[country].runs < 100){
        delete tempCountryData[country];
      }

    });


    this.countryWiseChart = new Chart(this.countryWiseChart.nativeElement, {

      type: 'bar',
      data: {

        labels: Object.keys(tempCountryData).map((country) => tempCountryData[country].countryName),
        datasets: [
          {
            label: 'Runs',
            data: Object.keys(tempCountryData).map((country) => tempCountryData[country].runs),
            backgroundColor: Object.keys(tempCountryData).map((country) => country === 'ARE' ? colors.colory : colors.colorb)
          }

        ]


      },
      options: {
        title: {
          display: true,
          text: 'Runs by countries he played in',
          fontSize: 18,
          position: 'bottom',
          padding: 10
        }
      }




    });






  }
  generateAverageChart(){

    // FILTER FUNCTION - To remove countries where runs less than 100

    const array = Object.keys(this.countryData);

    const tempCountryData = {...this.countryData};

    array.forEach(country => {

      if(tempCountryData[country].innings < 5){
        delete tempCountryData[country];
      }

    });


    this.countryAverageChart = new Chart(this.countryAverageChart.nativeElement, {

      type: 'bar',
      data: {

        labels: Object.keys(tempCountryData).map((country) => tempCountryData[country].countryName),
        datasets: [
          {
            label: 'Average',
            data: Object.keys(tempCountryData).map((country) => tempCountryData[country].average),
            backgroundColor: Object.keys(tempCountryData).map((country) => country === 'ZWE' ? colors.colory : colors.colorb)
          }

        ]


      },
      options: {
        elements: {
          line:{
            tension: 0
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
          text: 'Averages by countries he played in',
          fontSize: 18,
          position: 'bottom',
          padding: 10
        }

      }



    });






  }

  generateCenturiesWinAwayChart(){

    const runsWinData = [0, 0, 0]; //0 = win //1 = loss //2= n/r

    this.innings.forEach((inning: Inning) => {

      if(inning.batting_score >= 100 && inning.countryCode !== 'IND') {

        if (inning.match_result == 'won') {

          runsWinData[0] += 1;

        } else if (inning.match_result == 'lost') {

          runsWinData[1] += 1;

        } else {
          runsWinData[2] += 1;
        }

      }

    });

    this.cwChart = new Chart(this.cwChart.nativeElement, {

      type: 'pie',
      data: {
        labels: ['Win', 'Loss', 'Tied/NR'],
        datasets: [
          {
            label: 'Runs scored',
            data: runsWinData,
            backgroundColor: [
              colors.colory,
              colors.colorb,
              '#666666'
            ]
          }
        ]
      }
    });
  }

  generateRunWinAwayChart(){


    const runsWinData = [0, 0, 0]; //0 = win //1 = loss //2= n/r

    this.innings.forEach((inning: Inning) => {

      if(inning.countryCode !== 'IND') {

        if (inning.match_result == 'won') {

          runsWinData[0] += inning.batting_score;

        } else if (inning.match_result == 'lost') {

          runsWinData[1] += inning.batting_score;

        } else {
          runsWinData[2] += inning.batting_score;
        }

      }

    });

    this.rwChart = new Chart(this.rwChart.nativeElement, {

      type: 'pie',
      data: {
        labels: ['Win', 'Loss', 'Tied/NR'],
        datasets: [
          {
            label: 'Runs scored',
            data: runsWinData,
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



}
