import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';
import {
  fetchGetCvInternships,
  fetchPostAddCvOneInternships,
  fetchDeleteInternships,
  fetchDeleteAll,
} from '../controllers/interships';

const initialState = {
  interhipObj: [],
  objNew: {
    job_title: "",
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
  name: 'interships',
  initialState,
  reducers: {
    updateItemFieldIntership(state, action) {
      let { index, name, value } = action.payload;
      state.interhipObj[index][name] = value;
    },
    updateItemFieldIntershipDate(state, action) {
      let { index, name, value } = action.payload;
      state.interhipObj[index][name] = { date: value };
    },
    updateItemFieldIntershipNew(state, action) {
      let { name, value } = action.payload;
      state.objNew[name] = value;
    },
    updatePosition(state, action) {
      state.interhipObj = action.payload;
    },
    cleanSlise(state, action) {
      state.interhipObj = initialState.interhipObj;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.interships,
      }
    },
    // delete all
    [fetchDeleteAll.pending]: (state) => {
      state.objNew = initialState.objNew;
      state.status = statusLoader;
    },
    [fetchDeleteAll.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // delete 
    [fetchDeleteInternships.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchDeleteInternships.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // app
    [fetchPostAddCvOneInternships.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchPostAddCvOneInternships.fulfilled]: (state, action) => {
      state.objNew = initialState.objNew;
      state.status = statusLoaded;
    },
    // get
    [fetchGetCvInternships.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchGetCvInternships.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.interhipObj = action.payload;
    },
  }
});

export const {
  updateItemFieldIntership,
  updateItemFieldIntershipDate,
  updateItemFieldIntershipNew,
  updatePosition,
  cleanSlise,
} = slice.actions;

export const { reducer } = slice;
