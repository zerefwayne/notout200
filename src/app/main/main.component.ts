import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  rByOppColumns: string[] = ['opposition', 'innings', 'not_outs', 'runs', 'average', 'wickets'];
  rByOppDataSource = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.rByOppDataSource = this.dataService.getRecordByOppositions();
    this.dataService.setMomentDates();

  }

  getTotalRuns(): number{
    return this.dataService.getTotalRuns();
  }

  getTotalWickets(): number {
    return this.dataService.getTotalWickets();
  }

  getCountries(): string[] {

    return this.dataService.getAllCountriesPlayedAgainst();

  }

  getBattingAverage(): number {

    return this.dataService.getAverage();

  }

  getRunsByInnings(): {'1st': number, '2nd': number} {

    return this.dataService.getRunsByInnings();

  }

  getStatsBetween(start: number, end: number) {

    const startMoment = moment(start, 'YYYY').startOf('year');
    const endMoment = moment(end, 'YYYY').endOf('year');

    return this.dataService.getStatsBetween(startMoment, endMoment);

  }



}
