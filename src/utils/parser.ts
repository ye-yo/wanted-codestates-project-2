import {
  IMatch,
  IMatchList,
  IParsedMatch,
  IParsedData,
  IUserData,
  ITrackRecord,
  IKartRecord,
  ISummaryRecord,
  IFilter,
} from 'interfaces/match';
import { IPlayer } from 'interfaces/player';
import gameType from 'datas/gameType.json';
import characterData from 'datas/character.json';
import trackData from 'datas/track.json';
import kartData from 'datas/kart.json';
import { CHANNEL_NAMES, INITIAL_USER_DATA, DEFAULT_PARSED_DATA } from 'constants/match';
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
export const parseData = (datas: IMatchList, filter: IFilter): IParsedData => {
  if (datas.matches.length === 0) return DEFAULT_PARSED_DATA;
  let currentUserData: IUserData = INITIAL_USER_DATA;
  const matches: IParsedMatch[] = [];
  const originMatches: IParsedMatch[] = [];

  const matchList = datas.matches[0].matches;

  matchList.forEach((match: IMatch) => {
    const { player } = match;
    if (!player.matchRank) return;
    currentUserData = getCurrentUserData(player, currentUserData);
    const parsedMatch = extractData(match);
    originMatches.push(parsedMatch);
    if (isMatchedFilter(filter, parsedMatch)) {
      matches.push(parsedMatch);
    }
  });

  return { matches, originMatches, currentUserData };
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
    rank: +player.matchRank > 8 ? 8 : +player.matchRank,
    trackId,
    kartId: player.kart,
    trackName: getIdToName('track', trackId),
    kartName: getIdToName('kart', player.kart),
  };
};

const IS_FASTEST = /fastest/gi;
const IS_INFINIT = /infinit/gi;
const getChannelType = (name: string) => {
  if (name.match(IS_INFINIT)) return '???????????????';
  if (name.match(IS_FASTEST)) return '????????????';
  return '??????';
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
  if (!matches || matches.length === 0) return [];
  const map = new Map();
  matches.forEach((match) => {
    if (match.kartId === kartId) {
      map.set(match.trackId, match);
    }
  });
  return [...map.values()];
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
      if (item.channelType === '???????????????') infinite += 1;
      else if (item.channelType === '????????????') fastest += 1;
      else combine += 1;
    });
    const array = [combine, fastest, infinite];
    const maxCount = array.reduce((a, b) => (a > b ? a : b));
    const mostModes = CHANNEL_NAMES.filter((item: string, index: number) => array[index] === maxCount);
    return mostModes.join(',');
  },
  getRankAverage: (matchList: IParsedMatch[]) => {
    const rankSum = matchList.reduce((sum, cur) => sum + cur.rank, 0);
    return (rankSum / matchList.length).toFixed(1);
  },
};

export const getSummaryRecord = (matches: IParsedMatch[] | null): ISummaryRecord => {
  if (matches && matches.length > 0) {
    const { win } = getGameResult(matches);
    const loose = matches.length - win;
    const datas: IDatas = {
      data: [win, loose],
      color: ['#0077ff', '#f62459'],
    };
    return {
      win,
      loose,
      mostMode: Summary.getMostMode(matches),
      rankAverage: +Summary.getRankAverage(matches),
      datas,
    };
  }
  return { win: 0, loose: 0, mostMode: '', rankAverage: 0, datas: {} };
};

export const getRankingGraphRecord = (matches: IParsedMatch[] | null) => {
  if (matches && matches.length > 0) {
    const ranks = matches.map((match) => +match.rank);
    const total = ranks.length > 200 ? 200 : ranks.length;
    const latest = total > 50 ? 50 : total;
    let totals = ranks.slice(0, total);
    const totalRankAverage = Summary.getRankAverage(matches);
    if (latest !== total) {
      totals = ranks.slice(0, latest);
    }

    return {
      total: {
        count: ranks.length,
        rankAverage: totalRankAverage,
      },
      latest: {
        count: latest,
        rankAverage: latest !== total ? Summary.getRankAverage(matches.slice(0, latest)) : totalRankAverage,
      },
      datas: totals,
    };
  }
  return { total: {}, latest: {}, labels: [], datas: [] };
};

export const getRacePercentage = (matches: IParsedMatch[] | null) => {
  if (!matches) return { win: 0, complete: 0, retired: 0 };
  const { win, retired } = getGameResult(matches);
  const total = matches.length;
  const winPercent = Math.floor((win / total) * 100);
  const retiredPercent = Math.floor((retired / total) * 100);
  const completePercent = 100 - retiredPercent;
  return {
    win: winPercent,
    complete: completePercent,
    retired: retiredPercent,
  };
};

export const filtering = (matches: IParsedMatch[], filter: IFilter) => {
  return matches.filter((item) => isMatchedFilter(filter, item));
};

const isMatchedFilter = (filter: IFilter, item: IParsedMatch) => {
  const itemIsTeam = item.teamId === '1';
  if (itemIsTeam !== filter.isTeam) return false;
  if (item.channelType !== filter.channel) return false;
  if (!filter.showRetired && item.retired) return false;
  return true;
};
