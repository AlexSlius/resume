import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import {
  statusLoaded,
  statusLoader
} from '../constants/statuses';
import {
  fetchGetCvCourses,
  fetchPostAddCvOneCourses,
  fetchDeleteCourses,
  fetchDeleteAll,
  fetchUpdateCourses,
} from '../controllers/courses';

const initialState = {
  courseObj: [],
  objNew: {
    title: "",
    institution: "",
    period_from: "",
    period_to: "",
  },
  status: statusLoaded,
  statusNew: statusLoaded,
};

export const slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    updateItemFieldCourse(state, action) {
      let { index, name, value } = action.payload;
      state.courseObj[index][name] = value;
    },
    updateItemFieldCourseDate(state, action) {
      let { index, name, value } = action.payload;
      state.courseObj[index][name] = { date: value };
    },
    updateItemFieldCourseNew(state, action) {
      let { name, value } = action.payload;
      state.objNew[name] = value;
    },
    updatePosition(state, action) {
      state.courseObj = action.payload;
    },
    cleanSlise(state, action) {
      state.courseObj = initialState.courseObj;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      let objData = !!action?.payload?.resumeData?.data?.courses ? action.payload.resumeData.data.courses : action.payload.courses.courseObj;

      return {
        ...state,
        courseObj: objData,
      }
    },
    [fetchUpdateCourses.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchUpdateCourses.fulfilled]: (state, action) => {
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
    [fetchDeleteCourses.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchDeleteCourses.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // add
    [fetchPostAddCvOneCourses.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchPostAddCvOneCourses.fulfilled]: (state, action) => {
      state.objNew = initialState.objNew;
      state.status = statusLoaded;
    },
    // get 
    [fetchGetCvCourses.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchGetCvCourses.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.courseObj = action.payload;
    },
  }
});

export const {
  updateItemFieldCourse,
  updateItemFieldCourseDate,
  updateItemFieldCourseNew,
  updatePosition,
  cleanSlise,
} = slice.actions;

export const { reducer } = slice;
