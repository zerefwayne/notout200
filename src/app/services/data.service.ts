import {Injectable, OnInit} from '@angular/core';
import * as data from '../../assets/sachin-odi.json';
import * as _ from 'lodash';
import {Inning} from './inning.model';


@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{

  constructor() { }

  // @ts-ignore
  private inningsData: Inning[] = data.default;

  ngOnInit(): void {}

  getData() {
    return this.inningsData;
  }

  getTotalRuns(): number {
    let total: number = 0;
    this.inningsData.forEach((inning: Inning) => {
      total += inning.batting_score;
    });
    return total;
  }

  getAverage(): number {

    let totalInnings: number = 0;
    let totalRuns: number = 0;

    this.inningsData.forEach((inning: Inning) => {




    });

    return 0;
  }

  getTotalWickets(): number {
    let total: number = 0;
    this.inningsData.forEach((inning: Inning) => {
      total += Number(inning.wickets == '-' ? 0 : inning.wickets);
    });
    return total;
  }

  getAllCountriesPlayedAgainst(): string[] {

    let countries: string[] = [];

    this.inningsData.forEach((inning: Inning) => {

      countries.push(inning.opposition);

    });

    return _.sortBy(_.uniq(countries));

  }


}
