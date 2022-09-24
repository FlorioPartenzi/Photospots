import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  initialState: {
    email: '',
  },
  name: 'user',
  reducers: {
    login: (state, action) => {
      state.email = action.payload;
    },
    logout: (state) => {
      state.email = '';
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
