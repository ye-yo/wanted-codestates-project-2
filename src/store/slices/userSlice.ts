import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from 'services/userService';

interface IUser {
  accessId: string;
  level: number;
  name: string;
}
interface UserStateType {
  user: IUser | null;
  loading: boolean;
  error: string;
  lastUpdate: Date | null;
}
// const initialState: UserStateType = { user: null, loading: false, error: '', lastUpdate: null };
const initialState: UserStateType = {
  user: {
    accessId: '604675539',
    level: 16,
    name: '다이스x',
  },
  loading: false,
  error: '',
  lastUpdate: new Date(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.lastUpdate = new Date();
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
      });
  },
});
export const { setUser } = userSlice.actions;
export default userSlice;
