import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';
import {
  fetchGetCvEducations,
  fetchPostAddCvOneEducation,
  fetchDeleteEducation,
  fetchDeleteAll,
  fetchUpdateEducation
} from '../controllers/educations';

const initialState = {
  educationObj: [],
  objNew: {
    facility: "",
    degree: "",
    period_from: "",
    period_to: "",
    study: "",
    awards: "",
    description: "",
  },
  status: statusLoaded,
  statusNew: statusLoaded,
};

export const slice = createSlice({
  name: 'educations',
  initialState,
  reducers: {
    updateItemFieldEducation(state, action) {
      let { index, name, value } = action.payload;
      state.educationObj[index][name] = value;
    },
    updateItemFieldEducationDate(state, action) {
      let { index, name, value } = action.payload;
      state.educationObj[index][name] = { date: value };
    },
    updateItemFieldEducationNew(state, action) {
      let { name, value } = action.payload;
      state.objNew[name] = value;
    },
    updatePosition(state, action) {
      state.educationObj = action.payload;
    },
    cleanSlise(state, action) {
      state.educationObj = initialState.educationObj;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      let objData = !!action?.payload?.resumeData?.data?.education ? action.payload.resumeData.data.education : action.payload.educations.educationObj;

      return {
        ...state,
        educationObj: objData,
      }
    },
    [fetchUpdateEducation.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchUpdateEducation.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // delete all
    [fetchDeleteAll.pending]: (state) => {
      state.objNew = initialState.objNew;
      state.status = statusLoader;
    },
    [fetchDeleteAll.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // delete educations
    [fetchDeleteEducation.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchDeleteEducation.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // add educations
    [fetchPostAddCvOneEducation.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchPostAddCvOneEducation.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.objNew = initialState.objNew;
    },
    // get educations
    [fetchGetCvEducations.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchGetCvEducations.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.educationObj = action.payload;
    },
  }
});

export const {
  updateItemFieldEducation,
  updateItemFieldEducationDate,
  updateItemFieldEducationNew,
  updatePosition,
  cleanSlise,
} = slice.actions;

export const { reducer } = slice;
