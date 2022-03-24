/* eslint-disable no-promise-executor-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAULT_FILTER, DEFAULT_OPTIONS } from 'constants/match';
import { IFilter, IOPtions, IUpdateMatches } from 'interfaces/match';
// import fetchData from 'utils/fetchData';
import { parseData } from 'utils/parser';
import temp from '../temp.json';

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
    // fetchData(`/users/${accessId}/matches`, options || DEFAULT_OPTIONS),
    console.log(accessId, options);
    const start = options?.offset || DEFAULT_OPTIONS.offset;
    const end = options?.limit || DEFAULT_OPTIONS.limit;
    await fakeFetch();
    const datas = await fetchData(start, end, options);
    return { datas: parseData(datas, filter || DEFAULT_FILTER), filter, options };
  },
);

const fakeFetch = (delay = 2000) => new Promise((res) => setTimeout(res, delay));
const fetchData = (start: number, end: number, options?: IOPtions): any => {
  const offset = start * (options?.limit || DEFAULT_OPTIONS.limit);
  return temp.matches[1].matches.slice(offset, offset + end);
};
