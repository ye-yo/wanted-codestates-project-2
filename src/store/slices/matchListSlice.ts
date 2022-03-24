import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { getMatchList } from 'services/matchListService';
import { IParsedData, IFilter, IOPtions, IUpdateMatches } from 'interfaces/match';
import { filtering } from 'utils/parser';
import { DEFAULT_FILTER, DEFAULT_OPTIONS } from 'constants/match';

interface MatchListStateType {
  matches: IParsedData | null;
  filter: IFilter;
  options: IOPtions;
  loading: boolean;
  isEnded: boolean;
  error: string;
}
const initialState: MatchListStateType = {
  matches: null,
  options: DEFAULT_OPTIONS,
  filter: DEFAULT_FILTER,
  loading: false,
  isEnded: false,
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
        const { datas, options, filter }: IUpdateMatches = action.payload;
        if (options && state.matches) {
          const { originMatches, matches } = datas;
          const currentState = current(state);
          const prevMatches = currentState.matches?.matches || [];
          const prevOriginMatches = currentState.matches?.originMatches || [];
          state.matches.matches = [...prevMatches, ...matches];
          state.matches.originMatches = [...prevOriginMatches, ...originMatches];
        } else {
          state.matches = datas;
        }
        if (options !== undefined) state.options = options;
        if (filter !== undefined) state.filter = filter;
        if (datas.matches.length === 0) state.isEnded = true;
        else {
          state.isEnded = false;
        }
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
