import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Inning} from '../../services/inning.model';
import Chart from 'chart.js';
import colors from '../../shared/colors.model';

@Component({
  selector: 'app-batting',
  templateUrl: './batting.component.html',
  styleUrls: ['./batting.component.scss']
})
export class BattingComponent implements OnInit {

  @ViewChild('ninetiesChart') ninetiesChart: ElementRef;

  constructor(private dataService: DataService) { }

  private innings: Inning[] = [];

  ngOnInit() {

    this.innings = this.dataService.getAllInnings();
    this.generateNinetiesChart();


  }

  generateNinetiesChart() {


    let graphData = [];






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
          })


        }]
      }
    });



  }

}
