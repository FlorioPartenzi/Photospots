import { createSlice } from '@reduxjs/toolkit';

export const positionSlice = createSlice({
  initialState: {
    position: [2.11, 41.43],
  },
  name: 'position',
  reducers: {
    updatePosition: (state, action) => {
      state.position = [action.payload.lng, action.payload.lat];
    },
  },
});

export const { updatePosition } = positionSlice.actions;

export default positionSlice.reducer;
