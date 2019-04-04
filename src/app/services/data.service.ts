import {Injectable, OnInit} from '@angular/core';
import * as data from '../../assets/sachin-odi.json';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{

  constructor() { }

  // @ts-ignore
  private inningsData = data.default;

  ngOnInit(): void {}

  getData() {
    return this.inningsData;
  }

  getTotalRuns(): number {

    let total: number = 0;

    this.inningsData.forEach(inning => {

      total += inning['batting_score'];

    });

    return total;

  }

  getTotalWickets(): number {

    let total: number = 0;

    this.inningsData.forEach(inning => {

      total += Number(inning['wickets'] == '-' ? 0 : inning['wickets']);

    });

    return total;

  }


}
