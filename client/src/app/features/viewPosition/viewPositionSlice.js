import { createSlice } from '@reduxjs/toolkit';

export const viewPositionSlice = createSlice({
  initialState: {
    viewPosition: [0.0, 0.0],
  },

  name: 'viewPosition',
  reducers: {
    updateViewPosition: (state, action) => {
      state.viewPosition = [...action.payload];
    },
  },
});

export const { updateViewPosition } = viewPositionSlice.actions;

export default viewPositionSlice.reducer;
