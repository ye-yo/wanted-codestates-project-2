import { IMatchDetailDTO, IPlayer, ITeamDTO } from 'interfaces/player';
import fetchData from './fetchData';

export const getPlayers = async (matchId: string) => {
  const data = await fetchData(`/matches/${matchId}`);
  return data;
};

export const parsedPlayers = (detail: IMatchDetailDTO, userId: string) => {
  if (detail.teams) {
    const players = getPlayersFromTeam(detail.teams);
    const datas = sortRank(players);
    const user = players.filter((item) => item.accountNo === userId);
    return {
      datas,
      gameInfo: { isTeam: true, win: user[0].matchWin },
    };
  }
  if (detail.players) return { datas: sortRank(detail.players), gameInfo: {} };
  return { datas: [], gameInfo: {} };
};

const getPlayersFromTeam = (teams: ITeamDTO[]) => {
  return [...teams[0].players, ...teams[1].players];
};

const sortRank = (players: IPlayer[]) => {
  return players.sort((a, b) => +a.matchRank - +b.matchRank);
};
