import {Directive, ElementRef, OnInit} from '@angular/core';
import Chart from 'chart.js';


@Directive({
  selector: '[radarChart]'
})
export class RadarChartDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  data1: number[] = [60, 40, 60, 70, 80, 100];
  data2: number[] = [24, 1, 15, 100, 15, 56];

  ngOnInit(): void {


    this.elementRef = new Chart(this.elementRef.nativeElement, {
      type: 'radar',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data1,
            borderColor: '#00AEFF',
            fill: true,
            label: 'Data1'
          },
          {
            data: this.data2,
            borderColor: 'orange',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            fill: true,
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
