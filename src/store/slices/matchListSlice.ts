import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMatchList } from 'services/matchListService';
import { IParsedData, IFilter } from 'interfaces/match';

interface MatchListStateType {
  matches: IParsedData | null;
  filter: IFilter;
  loading: boolean;
  error: string;
}
const initialState: MatchListStateType = {
  matches: null,
  filter: {
    isTeam: false,
    channel: '통합',
    showRetired: true,
  },
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
    setGameType: (state, action: PayloadAction<boolean>) => {
      state.filter.isTeam = action.payload;
    },
    setChannel: (state, action: PayloadAction<string>) => {
      state.filter.channel = action.payload;
    },
    setShowRetired: (state, action: PayloadAction<boolean>) => {
      state.filter.showRetired = action.payload;
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
export const { setMatchList, setGameType, setChannel, setShowRetired } = matchListSlice.actions;
export default matchListSlice;
