export interface IGameInfo {
  isTeam?: boolean;
  win?: string;
}

export interface IMatchDetailDTO {
  channelName: string;
  startTime: string;
  endTime: string;
  gameSpeed: number;
  matchId: string;
  matchResult: string;
  matchType: string;
  playTime: number;
  trackId: string;
  players?: IPlayer[];
  teams?: ITeamDTO[];
}

export interface ITeamDTO {
  teamId: string;
  players: IPlayer[];
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
