// export type IMatchList = IMatch[];
export type ICardList = ICard[];

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

export interface IPlayer {
  accountNo: string;
  characterName: string;
  character: string;
  kart: string;
  license: string;
  pet: string;
  flyingPet: string;
  partsEngine: string;
  partsHandle: string;
  partsWheel: string;
  partsKit: string;
  rankinggrade2: string;
  matchRank: string;
  matchRetired: string;
  matchWin: string;
  matchTime: string;
}

export interface ICard {
  id: string;
  kart: string;
  track: string;
  time: string;
  date: string;
  rank: string;
  total: string;
  win: boolean;
  retired: boolean;
}

export interface ITotalGame {
  win: number;
  retired: number;
  ranks: Array<string>;
}

export interface IParsedMatch {
  matchId: string;
  matchName: string;
  teamId: string;
  date: string;
  matchTime: string;
  win: boolean;
  retired: boolean;
  rank: string;
  track: string;
  kart: string;
}

export interface ITotalRecord {
  win: number;
  retired: number;
  ranks: Array<any>;
}
