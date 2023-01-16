import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

const initialState = {
  educationObj: [
    {
      id: 1,
      facility: "",
      degree: "",
      period_from: "",
      period_to: "",
      study: "",
      awards: "",
      description: "",
    },
  ],
  status: "loaded"
};

export const slice = createSlice({
  name: 'educations',
  initialState,
  reducers: {
    updateItemFieldEducation(state, action) {
      let { index, name, value } = action.payload;
      state.educationObj[index][name] = value;
    },
  },
  extraReducers: {}
});

export const { updateItemFieldEducation } = slice.actions;

export const { reducer } = slice;
