import { createSlice } from '@reduxjs/toolkit';

export const pinnedListSlice = createSlice({
  initialState: {
    pinnedList: [],
  },
  name: 'pinnedList',
  reducers: {
    addToPinnedList: (state, action) => {
      state.pinnedList = [...state.pinnedList, action.payload];
    },
    removeFromPinnedList: (state, action) => {
      state.pinnedList = state.pinnedList.filter((location) => {
        return location.title != action.payload.title;
      });
    },
  },
});

export const { addToPinnedList, removeFromPinnedList } =
  pinnedListSlice.actions;

export default pinnedListSlice.reducer;
