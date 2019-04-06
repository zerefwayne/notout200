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

  getCountryCodes(location: string) {

    return this.http.get(encodeURI('https://api.opencagedata.com/geocode/v1/json?q=' + location + '&key=7d78dd8a496a47628854cce774400e74&pretty=1'));

    //return this.http.get( encodeURI('https://api.opencagedata.com/geocode/v1/json?q='+location+'&key=7d78dd8a496a47628854cce774400e74&pretty=1'));
  }

  async setCountryCodes() {

    let groundsData = [];
    let uniqueGroundNames = [];

    this.inningsData.forEach((inning: Inning) => {

      if (uniqueGroundNames.indexOf(inning.ground) === -1) {
        groundsData.push({
          groundName: inning.ground,
          countryCode: '',
          countryName: '',
          coordinates: [0, 0]
        });

        uniqueGroundNames.push(inning.ground);
      }

    });

    await groundsData.slice(0, 20).forEach(ground => {

      this.getCountryCodes(ground.groundName).subscribe(response => {

        ground.countryCode = response['results'][0]['components']['ISO_3166-1_alpha-3'];
        ground.countryName = response['results'][0]['components']['country'];
        ground.coordinates[0] = response['results'][0]['geometry']['lat'];
        ground.coordinates[1] = response['results'][0]['geometry']['lng'];

      });

    });

    await this.inningsData.forEach((inning: Inning) => {

      const ground = groundsData.find((ground) => {
        return ground.groundName === inning.ground;
      });

      inning.countryName = ground.countryName;
      inning.countryCode = ground.countryCode;
      inning.coordinates = ground.coordinates;

    });

    console.log(this.inningsData);

  }

}
