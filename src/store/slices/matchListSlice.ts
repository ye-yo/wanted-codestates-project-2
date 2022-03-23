import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMatchList } from 'services/matchListService';
import { IMatchList } from 'interfaces/match';

interface MatchListStateType {
  matches: IMatchList | null;
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
    setMatchList: (state, action: PayloadAction<IMatchList>) => {
      state.matches = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatchList.fulfilled, (state, action) => {
        state.matches = action.payload;
      })
      .addCase(getMatchList.rejected, (state) => {
        state.matches = null;
      });
  },
});
export const { setMatchList } = matchListSlice.actions;
export default matchListSlice;
