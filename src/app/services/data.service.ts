import {Injectable, OnInit} from '@angular/core';
import * as data from '../../assets/sachin-odi.json';
import * as _ from 'lodash';
import {Inning} from './inning.model';
import * as moment from 'moment';
import {Moment} from 'moment';
import {ɵEmptyOutletComponent} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor() { }

  // @ts-ignore
  private inningsData: Inning[] = data.default;

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
      if(inning.did_not_bat === 0)
      {
        totalRuns += inning.batting_score;
        if(inning.notout === 0){
          totalInnings++;
        }
      }
    });

    return _.round(totalRuns/totalInnings, 2);
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

  getRecordByOppositions() {
    const countries = this.getAllCountriesPlayedAgainst();
    const records = [];

    countries.forEach(country => {
      records.push({
        opposition: country,
        innings: 0,
        not_outs: 0,
        runs: 0,
        average: 0,
        wickets: 0
      });
    });

    this.inningsData.forEach((inning: Inning) => {
      const record = _.find(records, (record) => record.opposition === inning.opposition);
      if(record) {
        if (inning.did_not_bat === 0) {
          record.innings += 1;
          record.runs += inning.batting_score;
          if (inning.notout === 1) {
            record.not_outs += 1;
          }
        }
        if(inning.did_bowl === 1){
          record.wickets += inning.wickets;
        }
      }
    });

    records.forEach(record => {

      if(record.innings - record.not_outs !== 0) {
        record.average = _.round(record.runs / (record.innings - record.not_outs), 2);
      }
    });

    return records;
  }

  getRunsByInnings(): {'1st': number, '2nd': number} {

    const result = {
      '1st': 0,
      '2nd': 0
    };

    this.inningsData.forEach((inning: Inning) => {
      if(inning.did_not_bat === 0)
      {

        if(inning.batting_innings === 1){
          result['1st'] += inning.batting_score;
        } else {
          result['2nd'] += inning.batting_score;
        }

      }
    });

    return result;

  }

  setMomentDates(){
    this.inningsData.forEach((inning) => {
      inning.moment = moment(inning.date, 'DD MMM YYYY');
    });
  }

  getStatsBetween(start: Moment, end: Moment) {

    let runs: number = 0;
    let innings: number = 0;

    this.inningsData.forEach((inning: Inning) => {
      if(inning.did_not_bat === 0){

        if( inning.moment.isBetween(start, end)){
          runs += inning.batting_score;

          if(inning.notout === 0){
            innings++;
          }

        }

      }
    });

    let average: number = _.round(runs / innings, 2);

    return {average: average, runs: runs};
  }

  getAllInnings(): {data: number[], labels: number[], average: number} {

    let result = [];

    this.inningsData.forEach((inning: Inning, index: number) => {

      if(inning.did_not_bat === 0){

        result.push({
          score: inning.batting_score,
          index: index
        });

      }

    });

    let scoreArray: number[] = result.map((item) => {if(item){return item.score}});
    let indexArray: number[] = result.map((item) => {if(item){return item.index}});

    let average = this.getAverage();

    return {data: scoreArray, labels: indexArray, average: average};
  }



}
