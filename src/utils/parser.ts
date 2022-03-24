import temp from '../temp.json';
import {
  IMatch,
  ITotalRecord,
  IParsedMatch,
  IParsedData,
  IUserData,
  ITrackRecord,
  IKartRecord,
  ISummaryRecord,
} from 'interfaces/match';
import { IPlayer } from 'interfaces/player';
import gameType from 'datas/gameType.json';
import characterData from 'datas/character.json';
import trackData from 'datas/track.json';
import kartData from 'datas/kart.json';
import { CHANNEL_NAMES } from 'constants/match';
import { IDatas } from 'interfaces/chart';
import { NEXON_STORAGE_URL } from 'constants/env';

export const getIdToName = (key: string, id: string) => {
  if (id === '') return '';
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
  const matchList: IParsedMatch[] = [];
  let currentUserData: IUserData = infitialUserData;
  let summary: ITotalRecord = initialTotalData;

  data.forEach((match: IMatch) => {
    const { player } = match;
    if (!player.matchRank) return;
    currentUserData = getCurrentUserData(player, currentUserData);
    summary = getGameResult2(summary, player);
    const parsedMatch = extractData(match);
    matchList.push(parsedMatch);
  });

  summary.startDate = data[0].endTime;
  summary.lastDate = data[data.length - 1].endTime;
  return { matches: matchList, summary, currentUserData, total: summary.ranks.length };
};

const extractData = (match: IMatch): IParsedMatch => {
  const { matchId, channelName, matchType, teamId, endTime, trackId, player, playerCount, matchResult } = match;
  const matchName = getIdToName('match', matchType);
  return {
    matchId,
    channelType: getChannelType(channelName),
    matchName,
    teamId,
    date: endTime,
    record: '-',
    playerCount,
    win: matchResult === '1',
    retired: player.matchRetired === '1',
    rank: +player.matchRank,
    trackId,
    kartId: player.kart,
    trackName: getIdToName('track', trackId),
    kartName: getIdToName('kart', player.kart),
  };
};

const IS_FASTEST = /fastest/;
const IS_INFINIT = /infinit/;
const getChannelType = (name: string) => {
  if (IS_INFINIT.test(name)) return '무한부스터';
  if (IS_FASTEST.test(name)) return '매우빠름';
  return '통합';
};

type ITracksType = { [k: string]: ITrackRecord };

export const getTrackList = (matches: IParsedMatch[] | undefined) => {
  if (!matches) return [];
  const tracks: ITracksType = {};
  matches.forEach(({ trackId, trackName, win }: IParsedMatch) => {
    if (tracks[trackId]) {
      const prev = tracks[trackId];

      tracks[trackId] = {
        ...tracks[trackId],
        count: prev.count + 1,
        win: getNewPercentage(prev.win, prev.count),
        record: '-',
      };
    } else {
      tracks[trackId] = {
        id: trackId,
        name: trackName,
        count: 1,
        win: win ? '100%' : '0%',
        record: '-',
      };
    }
  });
  return Object.values(tracks);
};

const getNewPercentage = (value: string, count: number) => {
  let newValue = value;
  if (value) {
    const prevWin = +value.replace('%', '');
    const prevWinCount = (prevWin / 100) * count;
    newValue = `${Math.floor((prevWinCount + 1) / (count + 1))}%`;
  }
  return newValue;
};

type IKartsType = { [k: string]: IKartRecord };

export const getKartList = (matches: IParsedMatch[] | undefined) => {
  if (!matches) return [];
  const karts: IKartsType = {};
  matches.forEach(({ kartId, kartName, win, retired }: IParsedMatch) => {
    if (karts[kartId]) {
      const prev = karts[kartId];
      karts[kartId] = {
        ...karts[kartId],
        count: prev.count + 1,
        win: getNewPercentage(prev.win, prev.count),
        retired: getNewPercentage(prev.retired, prev.count),
      };
    } else {
      karts[kartId] = {
        id: kartId,
        name: {
          name: kartName,
          img: `${NEXON_STORAGE_URL}/kart/${kartId}.png`,
        },
        count: 1,
        win: win ? '100%' : '0%',
        retired: retired ? '100%' : '0%',
      };
    }
  });

  return Object.values(karts);
};

export const getTrackWithKart = (kartId: string, matches: IParsedMatch[] | undefined) => {
  if (!matches) return [];
  const map = new Map();
  for (const match of matches) {
    if (match.kartId === kartId) {
      map.set(match.trackId, match);
    }
  }
  return [...map.values()];
};

const getGameResult2 = (total: ITotalRecord, { matchWin, matchRetired, matchRank }: IPlayer) => {
  if (matchWin === '1') total.win += 1;
  if (matchRetired === '1') total.retired += 1;
  if (matchRank) total.ranks.push(+matchRank > 8 ? 8 : +matchRank);
  return total;
};

export const getGameResult = (list: IParsedMatch[]) => {
  let win = 0;
  let retired = 0;
  list.forEach((match) => {
    if (match.win) win += 1;
    if (match.retired) retired += 1;
  });
  return { win, retired };
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
  getMostMode: (matches: IParsedMatch[]) => {
    let combine = 0;
    let fastest = 0;
    let infinite = 0;
    matches.forEach((item) => {
      if (item.channelType === '무한부스터') infinite += 1;
      else if (item.channelType === '매우빠름') fastest += 1;
      else combine += 1;
    });
    const array = [combine, fastest, infinite];
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
      mostMode: Summary.getMostMode(matches.matches),
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
  const { win, retired } = getGameResult(matches.matches);
  const total = matches.matches.length;
  const winPercent = Math.floor((win / total) * 100);
  const retiredPercent = Math.floor((retired / total) * 100);
  const completePercent = 100 - retiredPercent;
  return {
    win: winPercent,
    complete: completePercent,
    retired: retiredPercent,
  };
};
