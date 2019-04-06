import {Injectable} from '@angular/core';
import * as sachin from '../../assets/sachin-odi.json'
import * as top10 from '../../assets/odi-top-10.json'
import {Inning} from './inning.model';
import * as moment from 'moment';
import {PlayerData} from './player.model';


@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor() { }

  // @ts-ignore
  private inningsData: Inning[] = sachin.default;
  // @ts-ignore
  private topTenData: PlayerData[] = top10.default;

  setMoments(){
    this.inningsData.forEach((inning: Inning) => {
      inning.moment = moment(inning.date, 'DD MMM YYYY').startOf('day');
    });
  }

  //World Cup Data

  getInningsBetween(start: moment.Moment, end: moment.Moment): Inning[] {
    return this.inningsData.filter( (inning: Inning) => {
      return inning.moment.isSameOrAfter(start) && inning.moment.isSameOrBefore(end) //this is a work around because isBetween is not inclusive
    });
  }

  getPlayersData(): PlayerData[] {

    return this.topTenData;

  }




}
