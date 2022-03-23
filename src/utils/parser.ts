import { IMatch, IPlayer, ITotalGame, ITotalRecord, IParsedMatch } from 'interfaces/match';
import gameType from 'datas/gameType.json';
import characterData from 'datas/character.json';
import trackData from 'datas/track.json';
import kartData from 'datas/kart.json';
import temp from '../temp.json';

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
};
const data = temp.matches[1].matches;
export const getData = () => {
  const matchList = [];
  const soloMatches: IParsedMatch[] = [];
  const teamMatches: IParsedMatch[] = [];
  const combineList: IParsedMatch[] = [];
  const fastest: IParsedMatch[] = [];
  const infinite: IParsedMatch[] = [];
  const trackRecords = [];
  const kartRecords = [];

  let currentUserData = infitialUserData;
  let totalRecordData: ITotalRecord = initialTotalData;

  data.forEach((match: IMatch) => {
    const { teamId, player, channelName } = match;
    currentUserData = getCurrentUserData(player, currentUserData);
    totalRecordData = getGameResult(totalRecordData, player);

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

  const matchHistoryData = {
    combineList,
    fastest,
    infinite,
    soloMatches,
    teamMatches,
  };

  return { totalRecordData, matchHistoryData, total: data.length };
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

const getGameResult = (total: ITotalGame, data: IPlayer) => {
  if (data.matchWin === '1') total.win += 1;
  if (data.matchRetired === '1') total.retired += 1;
  if (data.matchRank) total.ranks.push(data.matchRank);
  return total;
};

interface IUserProfile {
  character: string;
  characterName: string;
  license: string;
}

const getCurrentUserData = (player: IPlayer, userData: IUserProfile) => {
  if (!userData.character || !userData.license) {
    return userData;
  }
  if (player.character && !userData.character) {
    userData.character = player.character;
    userData.characterName = getIdToName('character', player.character);
  }
  if (player.license && !userData.license) {
    userData.license = player.license;
  }
  return userData;
};

export const convertRelativeDate = (now: Date, date: string) => {
  const today = new Date();
  const targetTime = new Date(date);

  const tiemLag = Math.floor((today.getTime() - targetTime.getTime()) / 1000 / 60);
  if (tiemLag < 1) return '몇 초 전';
  if (tiemLag < 60) {
    return `${tiemLag}분 전`;
  }

  const tiemLagHour = Math.floor(tiemLag / 60);
  if (tiemLagHour < 24) {
    return `${tiemLagHour}시간 전`;
  }

  const tiemLagDay = Math.floor(tiemLag / 60 / 24);
  if (tiemLagDay < 365) {
    return `${tiemLagDay}일 전`;
  }

  const timeLagMonth = Math.floor(tiemLag / 60 / 24 / 12);
  if (timeLagMonth < 12) {
    return `${tiemLagDay}개월 전`;
  }

  return `${Math.floor(tiemLagDay / 365)}년 전`;
};
