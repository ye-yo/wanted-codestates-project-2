import useAxios from 'hooks/useAxios';

interface IUserName {
  access_id: string;
}

interface IAllMatchList {
  start_date?: string;
  end_date?: string;
  offset?: number;
  limit?: number;
  match_types?: string;
}

interface IUserMatchList extends IAllMatchList {
  access_id: string;
}

const getUserName = (params: IUserName) => useAxios<IUserName>('/users', params);
const getUserData = (nickname: string) => useAxios(`/users/nickname/${encodeURIComponent(nickname)}`);
const getUserMatchList = (params: IUserMatchList) =>
  useAxios<IUserMatchList>(`/users/${params.access_id}/matches`, params);
const getAllMatches = () => useAxios('/matches/all');
const getMatchData = (matchId: string) => useAxios(`/matches/${matchId}`);

export { getUserName, getUserData, getUserMatchList, getAllMatches, getMatchData };
