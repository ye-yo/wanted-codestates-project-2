import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchData from 'utils/fetchData';

export const getUser = createAsyncThunk('user/getUser', (nickname: string) =>
  fetchData(`/users/nickname/${encodeURIComponent(nickname)}`),
);
