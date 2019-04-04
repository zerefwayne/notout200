import {Directive, ElementRef, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {DataService} from '../services/data.service';

@Directive({
  selector: '[barChart]'
})

export class BarChartDirective implements OnInit{

  constructor(private elementRef: ElementRef, private dataService: DataService) { }

  async ngOnInit(){

    const requiredData = await this.dataService.getAllInnings();

    this.elementRef = new Chart(this.elementRef.nativeElement, {

      type: 'bar',
      data: {
        labels: requiredData.labels,
        datasets: [
          {
            data: requiredData.data,
            backgroundColor: this.getColors(requiredData.data),
            label: 'Runs'

          }

        ]
      },
      options: {

      }

    });

  }

  getColors(scores: number[]): string[] {

    const colors: string[] = [];

    scores.forEach(score => {

      if(score >= 200){
        colors.push('green')
      } else if (score >=150) {
        colors.push('olive')
      } else if (score >= 100) {
        colors.push('yellow')
      } else if (score >= 50){
        colors.push('blue')
      } else {
        colors.push('#AAAAAA')
      }

    });

    return colors;

  }
}
