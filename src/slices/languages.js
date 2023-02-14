import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
  fetchGetCvLanguages,
  fetchPostAddCvOneLanguages,
  fetchDeleteLanguages,
} from "../controllers/languages";

const initialState = {
  languageObj: [],
  objNew: {
    language: "",
    level: "0",
  },
  status: statusLoaded,
  statusList: statusLoaded
};

export const slice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    updateItemLanguageFiled(state, action) {
      let { index, name, value } = action.payload;
      state.languageObj[index][name] = value;
    },
    cleanSlise(state, action) {
      state.languageObj = initialState.languageObj;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.languages,
      }
    },
    // delete 
    [fetchDeleteLanguages.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchDeleteLanguages.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // app
    [fetchPostAddCvOneLanguages.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchPostAddCvOneLanguages.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // get
    [fetchGetCvLanguages.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchGetCvLanguages.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.languageObj = action.payload;
    },
  }
});

export const {
   updateItemLanguageFiled,
   cleanSlise,
 } = slice.actions;

export const { reducer } = slice;
