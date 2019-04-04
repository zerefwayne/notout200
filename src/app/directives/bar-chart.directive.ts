import {Directive, ElementRef, OnInit} from '@angular/core';
import Chart from 'chart.js';

@Directive({
  selector: '[barChart]'
})

export class BarChartDirective implements OnInit{

  constructor(private elementRef: ElementRef) { }

  labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  data1: number[] = [12, 23, 5, 67, 56, 12];
  data2: number[] = [24, 1, 15, 100, 15, 56];

  ngOnInit(){

    this.elementRef = new Chart(this.elementRef.nativeElement, {

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

}
