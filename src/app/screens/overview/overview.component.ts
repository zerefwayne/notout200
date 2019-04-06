import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('playersRunChart') playersRunChart: ElementRef;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.playerData = this.dataService.getPlayersData();
    this.generatePlayersRunChart();
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
        }
      }

    });




  }



}
