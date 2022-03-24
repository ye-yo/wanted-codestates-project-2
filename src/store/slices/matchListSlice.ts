import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { getMatchList } from 'services/matchListService';
import { IParsedData, IFilter } from 'interfaces/match';
import { filtering } from 'utils/parser';

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
      const filter = { ...state.filter, isTeam: action.payload };
      state.filter = filter;
      const currentState = current(state);
      if (currentState.matches && state.matches) {
        state.matches.matches = filtering(currentState.matches.originMatches, filter);
      }
    },
    setChannel: (state, action: PayloadAction<string>) => {
      const filter = { ...state.filter, channel: action.payload };
      state.filter = filter;
      const currentState = current(state);
      if (currentState.matches && state.matches) {
        state.matches.matches = filtering(currentState.matches.originMatches, filter);
      }
    },
    setShowRetired: (state, action: PayloadAction<boolean>) => {
      const filter = { ...state.filter, showRetired: action.payload };
      state.filter = filter;
      const currentState = current(state);
      if (currentState.matches && state.matches) {
        state.matches.matches = filtering(currentState.matches.originMatches, filter);
      }
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
