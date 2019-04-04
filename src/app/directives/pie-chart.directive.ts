import {Directive, ElementRef, OnInit} from '@angular/core';
import Chart from 'chart.js';

@Directive({
  selector: '[pieChart]'
})
export class PieChartDirective implements OnInit{

  constructor(private elementRef: ElementRef) { }

  labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  data1: number[] = [12, 23, 5, 67, 56, 12];
  data2: number[] = [24, 12, 10, 70, 40, 6];
  colors: string[] = ['red', 'orange','blue', 'green','purple', 'black'];

  ngOnInit(): void {

    this.elementRef = new Chart(this.elementRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data1,
            fill: false,
            backgroundColor: this.colors,
            label: 'Data1'
          },
          {
            data: this.data2,
            fill: false,
            backgroundColor: this.colors,
            label: 'Data1'
          }
        ]
      },
      options: {
        elements: {}
      }
    });

  }


}
