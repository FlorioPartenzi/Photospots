import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import positionReducer from '../features/postition/positionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    position: positionReducer,
  },
});
