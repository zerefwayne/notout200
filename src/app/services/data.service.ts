import {Injectable} from '@angular/core';
import * as data from '../../assets/sachin-odi.json';
import {Inning} from './inning.model';


@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor() { }

  // @ts-ignore
  private inningsData: Inning[] = data.default;





}
