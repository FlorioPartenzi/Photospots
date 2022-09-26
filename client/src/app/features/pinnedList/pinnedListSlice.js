import { createSlice } from '@reduxjs/toolkit';

export const pinnedListSlice = createSlice({
  initialState: {
    pinnedList: [],
  },
  name: 'pinnedList',
  reducers: {
    addToPinnedList: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.pinnedList = [...state.pinnedList, ...action.payload];
      } else {
        state.pinnedList = [...state.pinnedList, action.payload];
      }
    },
    removeFromPinnedList: (state, action) => {
      state.pinnedList = state.pinnedList.filter((location) => {
        return location.title != action.payload.title;
      });
    },
    removeAllFromPinnedList: (state, action) => {
      state.pinnedList = [];
    },
  },
});

export const {
  addToPinnedList,
  removeFromPinnedList,
  removeAllFromPinnedList,
} = pinnedListSlice.actions;

export default pinnedListSlice.reducer;
