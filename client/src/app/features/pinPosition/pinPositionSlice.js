import { createSlice } from '@reduxjs/toolkit';

export const pinPositionSlice = createSlice({
  initialState: {
    pinPosition: [],
  },
  name: 'pinPosition',
  reducers: {
    addPinPosition: (state, action) => {
      state.pinPosition = [...state.pinPosition, action.payload];
    },
  },
});

export const { addPinPosition } = pinPositionSlice.actions;

export default pinPositionSlice.reducer;
