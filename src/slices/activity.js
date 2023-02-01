import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';
import { fetchGetCvActivitys, fetchPostAddCvOneActivitys, fetchDeleteActivitys } from '../controllers/activitys';

const initialState = {
  activityObj: [],
  objNew: {
    title: "",
    employer: "",
    period_from: "",
    period_to: "",
    country: "",
    city: "",
    description: "",
  },
  status: statusLoaded,
  statusNew: statusLoaded,
};

export const slice = createSlice({
  name: 'activitys',
  initialState,
  reducers: {
    updateItemFieldActivity(state, action) {
      let { index, name, value } = action.payload;
      state.activityObj[index][name] = value;
    },
    updateItemFieldActivityDate(state, action) {
      let { index, name, value } = action.payload;
      state.activityObj[index][name]['date'] = value;
    },
    updateItemFieldActivityNew(state, action) {
      let { name, value } = action.payload;
      state.objNew[name] = value;
    },
    updatePosition(state, action) {
      state.activityObj = action.payload;
    },
    cleanSlise(state, action) {
      state.activityObj = initialState.activityObj;
    },
  },
  extraReducers: {
    // delete educations
    [fetchDeleteActivitys.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchDeleteActivitys.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // add educations
    [fetchPostAddCvOneActivitys.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchPostAddCvOneActivitys.fulfilled]: (state, action) => {
      state.objNew = initialState.objNew;
      state.status = statusLoaded;
    },
    // get educations
    [fetchGetCvActivitys.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchGetCvActivitys.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.activityObj = action.payload;
    },
  }
});

export const {
  updateItemFieldActivity,
  updateItemFieldActivityDate,
  updateItemFieldActivityNew,
  updatePosition,
  cleanSlise,
} = slice.actions;

export const { reducer } = slice;
