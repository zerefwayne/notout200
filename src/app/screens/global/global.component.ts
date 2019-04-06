import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import colors from '../../shared/colors.model';
import * as Datamap from "node_modules/datamaps/dist/datamaps.world.min.js";

let map;

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})

export class GlobalComponent implements OnInit {

  @ViewChild('worldmap') worldMap: ElementRef;

  constructor() { }

  ngOnInit() {

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
      },data: {
        IND: { fillKey: "home" },
        AUS: { fillKey: "away"},
        NZL: { fillKey: "away"},
        KEN: { fillKey: "away"},
        GBR: { fillKey: "away"},
        ZAF: { fillKey: "away"},
        PAK: { fillKey: "away"},
        AFG: { fillKey: "away"},
        BGD: { fillKey: "away"},
        LKA: { fillKey: "away"},
        ZWE: { fillKey: "away"},
      }
    });

    map.bubbles(data);



  }

}
