import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DEFAULT_FILTER,
  DEFAULT_OPTIONS,
  DEFAULT_PARSED_DATA,
  MAX_OFFSET,
  SOLO_MATCH_TYPES,
  TEAM_MATCH_TYPES,
} from 'constants/match';
import { IFilter, IOPtions, IUpdateMatches } from 'interfaces/match';
import fetchData from 'utils/fetchData';
import { parseData } from 'utils/parser';

export const getMatchList = createAsyncThunk(
  'user/getMatchList',
  async ({
    accessId,
    filter,
    options,
  }: {
    accessId: string;
    filter?: IFilter;
    options?: IOPtions;
  }): Promise<IUpdateMatches> => {
    let newOptions = options || DEFAULT_OPTIONS;
    if (filter) {
      if (filter.isTeam) {
        newOptions = { ...newOptions, match_types: TEAM_MATCH_TYPES };
      } else {
        newOptions = { ...newOptions, match_types: SOLO_MATCH_TYPES };
      }
    }
    if (newOptions.offset > MAX_OFFSET) {
      return { datas: DEFAULT_PARSED_DATA, filter, options };
    }
    const datas = await fetchData(`/users/${accessId}/matches`, newOptions);
    return { datas: parseData(datas, filter || DEFAULT_FILTER), filter, options };
  },
);
