import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
  fetchGetCvHobie,
  fetchDeleteAll,
} from "../controllers/hobies";

const initialState = {
  hobiesObj: [],
  hobieObjNew: {
    text: '',
  },
  status: statusLoaded,
  statusList: statusLoaded
};

export const slice = createSlice({
  name: 'hobies',
  initialState,
  reducers: {
    updateItemHobiesFiledNew(state, action) {
      let { name, value } = action.payload;
      state.hobieObjNew[name] = value;
    },
    updatePosition(state, action) {
      state.hobiesObj = action.payload;
    },
    cleanSlise(state, action) {
      state.hobiesObj = initialState.hobiesObj;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      let objData = !!action?.payload?.resumeData?.data?.hobbies ? action.payload.resumeData.data.hobbies : action.payload.hobies.hobiesObj;

      return {
        ...state,
        hobiesObj: objData,
      }
    },
    // delete all
    [fetchDeleteAll.pending]: (state) => {
      state.hobieObjNew = initialState.hobieObjNew;
      state.status = statusLoader;
    },
    [fetchDeleteAll.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // get list skills all
    [fetchGetCvHobie.pending]: (state) => {
      state.statusList = statusLoader;
    },
    [fetchGetCvHobie.fulfilled]: (state, action) => {
      state.statusList = statusLoaded;
      state.hobiesObj = action.payload;
    },
  }
});

export const {
  updateItemHobiesFiledNew,
  updatePosition,
  cleanSlise,
} = slice.actions;

export const { reducer } = slice;
