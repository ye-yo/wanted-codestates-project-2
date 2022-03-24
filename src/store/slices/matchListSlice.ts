import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMatchList } from 'services/matchListService';
import { IParsedData } from 'interfaces/match';

interface MatchListStateType {
  matches: IParsedData | null;
  loading: boolean;
  error: string;
}
const initialState: MatchListStateType = {
  matches: null,
  loading: false,
  error: '',
};
export const matchListSlice = createSlice({
  name: 'matchList',
  initialState,
  reducers: {
    setMatchList: (state, action: PayloadAction<IParsedData>) => {
      state.matches = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatchList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMatchList.fulfilled, (state, action) => {
        state.matches = action.payload;
        state.loading = false;
      })
      .addCase(getMatchList.rejected, (state) => {
        state.matches = null;
        state.loading = false;
      });
  },
});
export const { setMatchList } = matchListSlice.actions;
export default matchListSlice;
