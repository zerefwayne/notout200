import {Directive, ElementRef, OnInit} from '@angular/core';
import Chart from 'chart.js';

@Directive({
  selector: '[lineChart]'
})
export class LineChartDirective implements OnInit{

  constructor(private elementRef: ElementRef) { }

  labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  data1: number[] = [12, 23, 5, 67, 56, 12];
  data2: number[] = [24, 1, 15, 100, 15, 56];

  ngOnInit(): void {

    this.elementRef = new Chart(this.elementRef.nativeElement, {
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
        elements: {}
      }
    });

  }


}
