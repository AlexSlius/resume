import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';
import {
  fetchGetCvEmployments,
  fetchPostAddCvOneEmployment,
  fetchDeleteEmployment,
  fetchUpdateEmployment,
  fetchDeleteCleanAllEmployment,
} from "../controllers/employments";

const initialState = {
  employmentObj: [],
  objNew: {
    title: "",
    company: "",
    period_from: "",
    period_to: "",
    country: "",
    assignment: "",
    city: "",
    title_id: "",
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
      state.employmentObj[index][name] = { date: value };
    },
    updateItemFieldEmploymentNew(state, action) {
      let { name, value } = action.payload;
      state.objNew[name] = value;
    },
    updatePosition(state, action) {
      state.employmentObj = action.payload;
    },
    cleanSlise(state, action) {
      state.employmentObj = initialState.employmentObj;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      let objData = !!action?.payload?.resumeData?.data?.employment ? action.payload.resumeData.data.employment : action.payload.employment.employmentObj;

      return {
        ...state,
        employmentObj: objData,
      }
    },
    // delete all
    [fetchDeleteCleanAllEmployment.pending]: (state) => {
      state.objNew = initialState.objNew;
      state.status = statusLoader;
    },
    [fetchDeleteCleanAllEmployment.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
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
      state.status = statusLoader;
    },
    [fetchUpdateEmployment.fulfilled]: (state, action) => {
      state.statusUpdate = statusLoaded;
      state.status = statusLoaded;
    },
  }
});

export const {
  updateItemFieldEmployment,
  updateItemFieldEmploymentDate,
  updateItemFieldEmploymentNew,
  updatePosition,
  cleanSlise,
} = slice.actions;

export const { reducer } = slice;
