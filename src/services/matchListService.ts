import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilter } from 'interfaces/match';
// import fetchData from 'utils/fetchData';
import { parseData } from 'utils/parser';

export const getMatchList = createAsyncThunk(
  'user/getMatchList',
  ({ accessId, filter, params }: { accessId: string; filter: IFilter; params?: object }) => {
    // fetchData(`/users/${accessId}/matches`, params),
    console.log(accessId, params);
    return parseData(filter);
  },
);
