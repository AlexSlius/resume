import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

const initialState = {
  employmentObj: {
    title: "",
    company: "",
    period_from: "",
    period_to: "",
    country: "",
    assignment: {},
  },
  status: "loaded"
};

export const slice = createSlice({
  name: 'employment',
  initialState,
  reducers: {
    updateItemFieldEmployment(state, action) {
      let { name, value } = action.payload;
      state.employmentObj[name] = value;
    },
  },
  extraReducers: {}
});

export const { updateItemFieldEmployment } = slice.actions;

export const { reducer } = slice;
