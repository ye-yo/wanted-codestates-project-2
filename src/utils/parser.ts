import temp from '../temp.json';
import {
  IMatch,
  IPlayer,
  ITotalRecord,
  IParsedMatch,
  IParsedData,
  IUserData,
  IMatchHistoryData,
  ITrackRecord,
  IKartRecord,
  ISummaryRecord,
} from 'interfaces/match';
import gameType from 'datas/gameType.json';
import characterData from 'datas/character.json';
import trackData from 'datas/track.json';
import kartData from 'datas/kart.json';
import { CHANNEL_NAMES } from 'constants/match';
import { IDatas } from 'interfaces/chart';

export const getIdToName = (key: string, id: string) => {
  let datas: any[] = [];
  switch (key) {
    case 'character':
      datas = characterData;
      break;
    case 'matchType':
      datas = gameType;
      break;
    case 'track':
      datas = trackData;
      break;
    case 'kart':
      datas = kartData;
      break;
    default:
      break;
  }
  if (datas.length === 0) return '';
  const target = datas.filter((data) => data.id === id);
  return target ? target[0].name : '';
};
const infitialUserData = {
  character: '',
  characterName: '',
  license: '',
};

const initialTotalData = {
  win: 0,
  retired: 0,
  ranks: [],
  startDate: '',
  lastDate: '',
};

const data = temp.matches[1].matches;
export const parseData = (): IParsedData => {
  const matchList = [];
  const soloMatches: IParsedMatch[] = [];
  const teamMatches: IParsedMatch[] = [];
  const combineList: IParsedMatch[] = [];
  const fastest: IParsedMatch[] = [];
  const infinite: IParsedMatch[] = [];
  const trackRecords: ITrackRecord[] = [];
  const kartRecords: IKartRecord[] = [];

  let currentUserData: IUserData = infitialUserData;
  let summary: ITotalRecord = initialTotalData;

  data.forEach((match: IMatch) => {
    const { teamId, player, channelName } = match;
    currentUserData = getCurrentUserData(player, currentUserData);
    summary = getGameResult(summary, player);

    const parsedMatch = extractData(match);
    const trackRecord = getTrackRecord(match, parsedMatch);
    const kartRecord = getKartRecord(match, parsedMatch);

    matchList.push(parsedMatch);
    trackRecords.push(trackRecord);
    kartRecords.push(kartRecord);

    if (teamId) {
      teamMatches.push(parsedMatch);
    } else {
      soloMatches.push(parsedMatch);
    }
    if (channelName === 'speedIndiFastest') {
      fastest.push(parsedMatch);
    } else if (channelName === 'speedIndiInfinit') {
      infinite.push(parsedMatch);
    } else {
      combineList.push(parsedMatch);
    }
  });
  summary.startDate = data[0].endTime;
  summary.lastDate = data[data.length - 1].endTime;

  const matchHistoryData: IMatchHistoryData = {
    combineList,
    fastest,
    infinite,
    soloMatches,
    teamMatches,
    trackRecords,
    kartRecords,
  };

  return { summary, currentUserData, matchHistoryData, total: summary.ranks.length };
};

const extractData = (match: IMatch) => {
  const { matchId, matchType, teamId, endTime, trackId, player, playerCount, matchResult } = match;
  const matchName = getIdToName('match', matchType);
  return {
    matchId,
    matchName,
    teamId,
    date: endTime,
    matchTime: player.matchTime,
    playerCount,
    win: matchResult === '1',
    retired: player.matchRetired !== '',
    rank: player.matchRank,
    track: trackId ? getIdToName('track', trackId) : '',
    kart: player.kart ? getIdToName('kart', player.kart) : '',
  };
};

const getTrackRecord = (match: IMatch, parsedMatch: IParsedMatch) => {
  return {
    trackId: match.trackId,
    trackName: parsedMatch.track,
    win: parsedMatch.win,
    kart: match.player.kart,
    matchTime: parsedMatch.matchTime,
  };
};

const getKartRecord = (match: IMatch, parsedMatch: IParsedMatch) => {
  return {
    kartId: match.player.kart,
    kartName: parsedMatch.kart,
    win: parsedMatch.win,
    retired: parsedMatch.retired,
  };
};

const getGameResult = (total: ITotalRecord, { matchWin, matchRetired, matchRank }: IPlayer) => {
  if (matchWin === '1') total.win += 1;
  if (matchRetired === '1') total.retired += 1;
  if (matchRank) total.ranks.push(+matchRank > 8 ? 8 : +matchRank);
  return total;
};

interface IUserProfile {
  character: string;
  characterName: string;
  license: string;
}

const getCurrentUserData = (player: IPlayer, userData: IUserProfile) => {
  if (userData.character && userData.license) {
    return userData;
  }
  const user = { ...userData };
  if (player.character && !userData.character) {
    user.character = player.character;
    user.characterName = getIdToName('character', player.character);
  }
  if (player.license && !userData.license) {
    user.license = player.license;
  }
  return user;
};

export const Summary = {
  getMostMode: (data: IParsedData) => {
    const array = [
      data.matchHistoryData.combineList.length,
      data.matchHistoryData.fastest.length,
      data.matchHistoryData.infinite.length,
    ];
    const maxCount = array.reduce((a, b) => (a > b ? a : b));
    const mostModes = CHANNEL_NAMES.filter((item: string, index: number) => array[index] === maxCount);
    return mostModes.join(',');
  },
  getRankAverage: (ranks: Array<any>) => {
    const rankSum = ranks.reduce((sum, cur) => sum + cur, 0);
    return rankSum / ranks.length;
  },
  getLoose: (data: IParsedData) => {
    if (data && data.total) {
      return data.total - (data.summary.win || 0);
    }
    return 0;
  },
};

export const getSummaryRecord = (matches: IParsedData | null): ISummaryRecord => {
  if (matches) {
    const win = matches?.summary.win || 0;
    const loose = Summary.getLoose(matches);
    const datas: IDatas = {
      data: [win, loose],
      color: ['#0077ff', '#f62459'],
    };
    return {
      loose,
      mostMode: Summary.getMostMode(matches),
      rankAverage: Summary.getRankAverage(matches?.summary.ranks),
      labels: [`${matches?.summary.win || 0}승`, `${loose}`],
      datas,
    };
  }
  return { loose: 0, mostMode: '', rankAverage: 0, labels: [], datas: {} };
};

export const getRankingGraphRecord = (matches: IParsedData | null) => {
  if (matches) {
    const ranks = matches?.summary?.ranks;
    const total = ranks.length > 200 ? 200 : ranks.length;
    const latest = total > 50 ? 50 : total;
    let totals = ranks.slice(0, total);
    const totalRankAverage = Summary.getRankAverage(totals);
    if (latest !== total) {
      totals = ranks.slice(0, latest);
    }

    return {
      total: {
        count: matches.total,
        rankAverage: totalRankAverage,
      },
      latest: {
        count: latest,
        rankAverage: latest !== total ? Summary.getRankAverage(ranks.slice(0, latest)) : totalRankAverage,
      },
      datas: totals,
    };
  }
  return { total: {}, latest: {}, labels: [], datas: [] };
};

export const getRacePercentage = (matches: IParsedData | null) => {
  if (!matches) return { win: 0, complete: 0, retired: 0 };
  const { win, retired, ranks } = matches.summary;
  const total = ranks.length;
  const winPercent = Math.floor((win / total) * 100);
  const completePercent = Math.floor(((total - retired) / total) * 100);
  const retiredPercent = Math.floor((retired / total) * 100);
  return {
    win: winPercent,
    complete: completePercent,
    retired: retiredPercent,
  };
};
