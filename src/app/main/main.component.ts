import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private dataService: DataService) { }

  ngOnInit() {}

  getTotalRuns(): number{
    return this.dataService.getTotalRuns();
  }

  getTotalWickets(): number {
    return this.dataService.getTotalWickets();
  }

  getCountries(): string[] {

    return this.dataService.getAllCountriesPlayedAgainst();

  }

}
