import {Injectable} from '@angular/core';
import * as sachin from '../../assets/sachin-odi.json'
import * as top10 from '../../assets/odi-top-10.json'
import {Inning} from './inning.model';
import * as moment from 'moment';
import {PlayerData} from './player.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  // @ts-ignore
  private inningsData: Inning[] = sachin.default;
  // @ts-ignore
  private topTenData: PlayerData[] = top10.default;

  setMoments() {
    this.inningsData.forEach((inning: Inning) => {
      inning.moment = moment(inning.date, 'DD MMM YYYY').startOf('day');
    });
  }

  //World Cup Data

  getInningsBetween(start: moment.Moment, end: moment.Moment): Inning[] {
    return this.inningsData.filter((inning: Inning) => {
      return inning.moment.isSameOrAfter(start) && inning.moment.isSameOrBefore(end) //this is a work around because isBetween is not inclusive
    });
  }

  getPlayersData(): PlayerData[] {

    return this.topTenData;

  }

  getAllInnings(): Inning[] {

    return this.inningsData;

  }

  /*getCountryCodes(location: string) {

    return this.http.get(encodeURI('https://api.opencagedata.com/geocode/v1/json?q=' + location + '&key=64edaa2d59224ae497193c859842e382&pretty=1'));

  }

  /!*setCountryCodes() {

    this.inningsData.forEach((inning: Inning, index: number) => {


      this.getCountryCodes(inning.ground).subscribe(response => {

        // @ts-ignore
        const code = response.results[0].components['ISO_3166-1_alpha-3'];
        // @ts-ignore
        const name = response.results[0].components.country;

        inning.countryCode = code;
        inning.countryName = name;

      });

    });

  }
*!/*/

}
