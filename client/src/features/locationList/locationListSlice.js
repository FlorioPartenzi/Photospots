import { createSlice } from '@reduxjs/toolkit';

export const locationListSlice = createSlice({
  initialState: {
    locationList: [],
  },
  name: 'locationList',
  reducers: {
    setLocationList: (state, action) => {
      state.locationList = [...action.payload];
    },
  },
});

export const { setLocationList } = locationListSlice.actions;

export default locationListSlice.reducer;
