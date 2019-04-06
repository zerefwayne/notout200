import {AfterContentChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js';

import {DataService} from '../../services/data.service';
import {PlayerData} from '../../services/player.model';
import colors from '../../shared/colors.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  playerData: PlayerData[] = [];
  sachinData: PlayerData;

  @ViewChild('playersRunChart') playersRunChart: ElementRef;
  @ViewChild('playersInningChart') playersInningChart: ElementRef;
  @ViewChild('playersCenturyChart') playersCenturyChart: ElementRef;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.playerData = this.dataService.getPlayersData();

    this.sachinData = this.playerData.find((player) => player.name === 'Sachin Tendulkar');

    this.generatePlayersRunChart();
    this.generatePlayersInningChart();
    this.generatePlayersCenturyChart();

  }


  generatePlayersRunChart() {

    this.playersRunChart = new Chart(this.playersRunChart.nativeElement, {

      type: 'bar',
      data: {
        labels: this.playerData.map((player) => player.name),
        datasets: [
          {
            label: 'Runs scored',
            data: this.playerData.map((player) => player.runs),
            backgroundColor: this.playerData.map((player) => player.name === 'Sachin Tendulkar' ? colors.colory : colors.colorb)
          }
        ]
      },
      options: {
        legend: {
          display: true
        },

      }

    });

  }

  generatePlayersInningChart() {

    this.playersInningChart = new Chart(this.playersInningChart.nativeElement, {

      type: 'line',
      data: {
        labels: this.playerData.map((player) => player.name),
        datasets: [
          {
            label: 'Innings played',
            data: this.playerData.map((player) => player.innings),
            backgroundColor: this.playerData.map((player) => player.name === 'Sachin Tendulkar' ? colors.colory : colors.colorb),
            fill: 'boundary'
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
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

    generatePlayersCenturyChart() {

      this.playersCenturyChart = new Chart(this.playersCenturyChart.nativeElement, {

        type: 'bar',
        data: {
          labels: this.playerData.map((player) => player.name),
          datasets: [
            {
              label: 'Centuries scored',
              data: this.playerData.map((player) => player.centuries),
              backgroundColor: this.playerData.map((player) => player.name === 'Sachin Tendulkar' ? colors.colory : colors.colorb)
            }
          ]
        },
        options: {
          legend: {
            display: true
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



}
