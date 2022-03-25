import { IPlayer } from './player';

export interface IMatchList {
  nickname: string;
  matches: IMatchDTO[];
}
export interface IMatchDTO {
  matchType: string;
  matches: IMatch[];
}
export interface IMatch {
  accountNo: string;
  matchId: string;
  matchType: string;
  teamId: string;
  character: string;
  startTime: string;
  endTime: string;
  channelName: string;
  trackId: string;
  playerCount: number;
  matchResult: string;
  seasonType: string;
  player: IPlayer;
}

export interface IParsedMatch {
  matchId: string;
  matchName: string;
  channelType: string;
  teamId: string;
  date: string;
  record: string;
  win: boolean;
  retired: boolean;
  rank: number;
  trackId: string;
  kartId: string;
  trackName: string;
  kartName: string;
  playerCount: number;
}

export interface ITotalRecord {
  win: number;
  retired: number;
  ranks: Array<number>;
  startDate: string;
  lastDate: string;
}

export interface IUserData {
  character: string;
  characterName: string;
  license: string;
}

export interface IParsedData {
  currentUserData: IUserData;
  matches: IParsedMatch[];
  originMatches: IParsedMatch[];
}

export interface ITrackRecord {
  id: string;
  name: string;
  count: number;
  win: string;
  record: string;
}

export interface IKartRecord {
  id: string;
  name: ITableNameColumn;
  win: string;
  retired: string;
  count: number;
}

export interface ISummaryRecord {
  win: number;
  loose: number;
  mostMode: string;
  rankAverage: number;
  datas: any;
}

export interface IFilter {
  channel: string;
  isTeam: boolean;
  showRetired: boolean;
}

interface ITableNameColumn {
  name: string;
  img: string;
}

export interface IOPtions {
  offset: number;
  limit: number;
  match_types: string;
}

export interface IUpdateMatches {
  datas: IParsedData;
  filter?: IFilter;
  options?: IOPtions;
}
