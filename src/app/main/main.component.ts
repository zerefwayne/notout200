import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

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




}
