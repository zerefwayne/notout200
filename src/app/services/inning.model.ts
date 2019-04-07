import {Moment} from 'moment';

export interface Inning {

  batting_score: number;
  did_not_bat: number;
  did_bowl: number;
  notout: number;
  wickets: string;
  runs_conceded: string;
  catches: number;
  opposition: string;
  ground: string;
  date: string;
  moment?: Moment;
  match_result: string;
  result_margin: string;
  batting_innings: number;
  toss: string;
  countryCode?: string;
  countryName?: string;
  coordinates? : number[];

}
