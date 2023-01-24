import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';
import {
  fetchGetCvEmployments,
  fetchPostAddCvOneEmployment,
  fetchDeleteEmployment,
  fetchUpdateEmployment,
} from "../controllers/employments";
import { defaultCountry } from '../constants/default';

const initialState = {
  employmentObj: [],
  objNew: {
    title: "",
    company: "",
    period_from: "",
    period_to: "",
    country: defaultCountry,
    assignment: "",
    city: ""
  },
  status: statusLoaded,
  statusUpdate: statusLoaded
};

export const slice = createSlice({
  name: 'employment',
  initialState,
  reducers: {
    updateItemFieldEmployment(state, action) {
      let { index, name, value } = action.payload;
      state.employmentObj[index][name] = value;
    },
    updateItemFieldEmploymentDate(state, action) {
      let { index, name, value } = action.payload;
      state.employmentObj[index][name]['date'] = value;
    },
    updateItemFieldEmploymentNew(state, action) {
      let { name, value } = action.payload;
      state.objNew[name] = value;
    },
    updatePosition(state, action) {
      state.employmentObj = action.payload;
    },
  },
  extraReducers: {
    // delete
    [fetchDeleteEmployment.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchDeleteEmployment.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // add
    [fetchPostAddCvOneEmployment.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchPostAddCvOneEmployment.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.objNew = initialState.objNew;
    },
    // get
    [fetchGetCvEmployments.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchGetCvEmployments.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.employmentObj = action.payload;
    },
    // update
    [fetchUpdateEmployment.pending]: (state) => {
      state.statusUpdate = statusLoader;
    },
    [fetchUpdateEmployment.fulfilled]: (state, action) => {
      state.statusUpdate = statusLoaded;
    },
  }
});

export const {
  updateItemFieldEmployment,
  updateItemFieldEmploymentDate,
  updateItemFieldEmploymentNew,
  updatePosition
} = slice.actions;

export const { reducer } = slice;
