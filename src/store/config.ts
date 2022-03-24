import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit'; // configureStore는 리덕스 코어 라이브러리의 표준 함수인 createStore를 추상화한 것
// 기존 리덕스의 번거로운 기본 설정 과정을 자동화하는 것인
// import { createLogger } from 'redux-logger';
import userSlice from './slices/userSlice';
import matchListSlice from './slices/matchListSlice';

// const logger = createLogger();
const rootReducer = combineReducers({
  user: userSlice.reducer,
  matchList: matchListSlice.reducer,
});
const initialState = {};
export const store = configureStore({
  reducer: rootReducer, // 리덕스 스토어의 rootReducer 설정
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // redux-logger같은 미들웨어 설정. 설정 시 자동으로 applymiddleware에 전달. 개발자들이 필요한 것임
  devTools: process.env.NODE_ENV !== 'production', // 리덕스 데브툴 사용여부 . 기본값 true
  preloadedState: initialState, // 리덕스 스토어 초기값 설정
  enhancers: (defaultEnhancers) => [...defaultEnhancers], // 사용자 정의 미들웨어
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // useSelector훅 추상화
export const useAppDispatch = () => useDispatch<AppDispatch>(); // useDispatch hook 추상ㅎ화 => 이렇게 할 경우 각 컴포넌트에서 useSelecotr, useDispatch 매번 설정할 필요없이 사용가능
export default store;
