import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import positionReducer from './features/postition/positionSlice';
import pinPositionReducer from './features/pinPosition/pinPositionSlice';
import viewPositionReducer from './features/viewPosition/viewPositionSlice';
import locationListReducer from './features/locationList/locationListSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    position: positionReducer,
    pinPosition: pinPositionReducer,
    viewPosition: viewPositionReducer,
    locationList: locationListReducer,
  },
});
