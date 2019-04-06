import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import colors from '../../shared/colors.model';
import * as Datamap from "node_modules/datamaps/dist/datamaps.world.min.js";

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  @ViewChild('worldmap') worldMap: ElementRef;

  constructor() { }

  ngOnInit() {

    new Datamap({
      element: this.worldMap.nativeElement,
      projection: 'mercator',
      fills: {
        defaultFill: '#CCCCCC',
        authorHasTraveledTo: colors.colory,
        blackList: colors.colorb
      },data: {
        USA: { fillKey: "authorHasTraveledTo" },
        JPN: { fillKey: "authorHasTraveledTo" },
        ITA: { fillKey: "authorHasTraveledTo" },
        CRI: { fillKey: "authorHasTraveledTo" },
        KOR: { fillKey: "authorHasTraveledTo" },
        IND: { fillKey: "blackList" },
      }
    });



  }

}
