import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

const initialState = {
  employmentObj: [
    {
      id: 1,
      title: "",
      company: "",
      period_from: "",
      period_to: "",
      country: {},
      assignment: "",
      city: ""
    },
    {
      id: 2,
      title: "",
      company: "",
      period_from: "",
      period_to: "",
      country: {},
      assignment: "",
      city: ""
    }
  ],
  status: "loaded"
};

export const slice = createSlice({
  name: 'employment',
  initialState,
  reducers: {
    updateItemFieldEmployment(state, action) {
      let { index, name, value } = action.payload;
      state.employmentObj[index][name] = value;
    },
  },
  extraReducers: {}
});

export const { updateItemFieldEmployment } = slice.actions;

export const { reducer } = slice;
