import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import colors from '../../shared/colors.model';
import * as Datamap from "node_modules/datamaps/dist/datamaps.world.min.js";
import {DataService} from '../../services/data.service';
import {Inning} from '../../services/inning.model';
import * as _ from 'lodash';

let map;

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})

export class GlobalComponent implements OnInit {

  @ViewChild('worldmap') worldMap: ElementRef;

  private innings: Inning[] = [];
  private countryMapFill: {} = {};

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.innings = this.dataService.getAllInnings();

    this.innings.forEach((inning: Inning) => {

      if(this.countryMapFill[inning.countryCode] === undefined){

        this.countryMapFill[inning.countryCode] = { fillKey: inning.countryCode === 'IND' ? 'home' : 'away' };

      }

    });

    console.log(this.countryMapFill);

    const data = [{
      name: 'Joe 4',
      yield: 400,
      country: 'IND',
      fillKey: 'away',
      latitude: 50.07,
      longitude: 78.43
    }];

    map = new Datamap({
      element: this.worldMap.nativeElement,
      projection: 'mercator',
      geographyConfig: {
        popupOnHover: true,
      },
      fills: {
        defaultFill: '#CCCCCC',
        authorHasTraveledTo: colors.colory,
        home: colors.colory,
        away: colors.colorb
      },data: this.countryMapFill
    });

    map.bubbles(data);

  }

}
