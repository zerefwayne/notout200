import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import Chart from 'chart.js';

@Directive({
  selector: '[bubbleChart]'
})

export class BubbleChartDirective implements OnInit{

  constructor(private elementRef: ElementRef) { }

  dataPoints1: {x: number, y:number, r: number}[] = [
    {
      x: 12,
      y: 24,
      r: 10
    },
    {
      x: 23,
      y: 1,
      r: 6
    },
    {
      x: 5,
      y: 15,
      r: 23
    },
    {
      x: 67,
      y: 100,
      r: 17
    },
    {
      x: 56,
      y: 15,
      r: 32
    },
    {
      x: 12,
      y: 56,
      r: 20
    }

  ];
  dataPoints2: {x: number, y:number, r: number}[] = [
    {
      x: 22,
      y: 24,
      r: 10
    },
    {
      x: 13,
      y: 1,
      r: 6
    },
    {
      x: 87,
      y: 15,
      r: 23
    },
    {
      x: -15,
      y: 100,
      r: 17
    },
    {
      x: 10,
      y: 15,
      r: 32
    },
    {
      x: 0,
      y: 56,
      r: 20
    }

  ];


  ngOnInit(): void {

    this.elementRef = new Chart(this.elementRef.nativeElement, {
      type: 'bubble',
      data: {
        label: 'Data',
        datasets: [
          {
            data: this.dataPoints1,
            backgroundColor: '#007BD5',
            label: 'Team India'

          },
          {
            data: this.dataPoints2,
            backgroundColor: '#F3572A',
            label: 'Team Netherlands'

          }
        ]

      },
      options: {
        elements: {}
      }
    });

  }


}
