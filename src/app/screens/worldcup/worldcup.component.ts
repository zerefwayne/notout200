import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {DataService} from '../../services/data.service';
import {Inning} from '../../services/inning.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-worldcup',
  templateUrl: './worldcup.component.html',
  styleUrls: ['./worldcup.component.scss']
})
export class WorldcupComponent implements OnInit {

  worldCupDates = {
    "1992": {
      "start": moment('22 Feb 1992', 'DD MMM YYYY').startOf('day'),
      "end": moment('25 Mar 1992', 'DD MMM YYYY').endOf('day')
    },
    "1996": {
      "start": moment('14 Feb 1996', 'DD MMM YYYY').startOf('day'),
      "end": moment('17 Mar 1996', 'DD MMM YYYY').endOf('day')
    },
    "2003": {
      "start": moment('9 Feb 2003', 'DD MMM YYYY').startOf('day'),
      "end": moment('24 Mar 2003', 'DD MMM YYYY').endOf('day')
    },
    "2007": {
      "start": moment('13 Mar 2007', 'DD MMM YYYY').startOf('day'),
      "end": moment('28 Apr 2007', 'DD MMM YYYY').endOf('day')
    },
    "2011": {
      "start": moment('19 Feb 2011', 'DD MMM YYYY').startOf('day'),
      "end": moment('02 Apr 2011', 'DD MMM YYYY').endOf('day')
    },
  };

  overall =  {
    runs: 0,
    innings: 0,
    not_outs: 0,
    average: 0
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {

    Object.keys(this.worldCupDates).forEach(date => {

      let start = this.worldCupDates[date].start;
      let end = this.worldCupDates[date].end;

      this.dataService.getInningsBetween(start, end).forEach((inning: Inning) => {

        this.overall.runs += inning.batting_score;

        if(inning.did_not_bat === 0){

          this.overall.innings += 1;

          if(inning.notout === 1){

            this.overall.not_outs += 1;

          }

        }

      });

    });

    this.overall.average = _.round(this.overall.runs / (this.overall.innings - this.overall.not_outs), 2);

  }



}
