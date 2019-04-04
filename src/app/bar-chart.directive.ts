import {Directive, ElementRef} from '@angular/core';
import Chart from 'chart.js';

@Directive({
  selector: '[barChart]'
})
export class BarChartDirective {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(){

    this.elementRef = new Chart(this.elementRef.nativeElement, {



    });


  }

}
