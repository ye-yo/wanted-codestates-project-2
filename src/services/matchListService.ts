import { createAsyncThunk } from '@reduxjs/toolkit';
// import fetchData from 'utils/fetchData';
import { parseData } from 'utils/parser';

export const getMatchList = createAsyncThunk('user/getMatchList', (accessId: string, params?: object) => {
  // fetchData(`/users/${accessId}/matches`, params),
  console.log(accessId, params);
  return parseData();
});
