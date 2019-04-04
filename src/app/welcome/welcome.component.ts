import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  totalRuns: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {

    console.log(this.dataService.getData());

  }

}
