import {Component, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  @ViewChild('lineChart') private lineChartRef;
  @ViewChild('barChart') private barChartRef;

  labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  data1: number[] = [12, 23, 5, 67, 56, 12];
  data2: number[] = [24, 1, 15, 100, 15, 56];

  constructor() { }

  ngOnInit() {

    this.lineChartRef = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data1,
            borderColor: '#00AEFF',
            fill: false,
            label: 'Data1'
          },
          {
            data: this.data2,
            borderColor: 'orange',
            fill: false,
            label: 'Data2'
          }
        ]
      },
      options: {
        elements: {

        }
      }
    });

    this.barChartRef = new Chart(this.barChartRef.nativeElement, {

      type: 'horizontalBar',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data1,
            fill: false,
            backgroundColor: '#007BD5',
            label: 'Data1'
          },
          {
            data: this.data2,
            fill: false,
            backgroundColor: '#F3572A',
            label: 'Data2'
          }
        ]
      },
      options: {

      }

    });



  }

  getReverse(array: number[]): number[] {

    return array.reverse();

  }

}
