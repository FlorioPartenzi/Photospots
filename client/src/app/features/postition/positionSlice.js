import { createSlice } from '@reduxjs/toolkit';

export const positionSlice = createSlice({
  initialState: {
    position: [undefined, undefined],
  },
  name: 'position',
  reducers: {
    updatePosition: (state, action) => {
      state.position = [...action.payload];
    },
  },
});

export const { updatePosition } = positionSlice.actions;

export default positionSlice.reducer;
