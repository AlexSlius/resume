import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
  fetchGetCvLanguages,
  fetchPostAddCvOneLanguages,
  fetchDeleteLanguages,
  fetchUpdateLanguages,
} from "../controllers/languages";

const initialState = {
  languageObj: [],
  objNew: {
    language: "",
    level: 0,
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
    updateItemLanguageFiledNew(state, action) {
      let { name, value } = action.payload;
      state.objNew[name] = value;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      let objData = !!action?.payload?.resumeData?.data?.languages ? action.payload.resumeData.data.languages : action.payload.languages.languageObj;

      return {
        ...state,
        languageObj: objData,
      }
    },
    [fetchUpdateLanguages.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchUpdateLanguages.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // delete 
    [fetchDeleteLanguages.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchDeleteLanguages.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // add
    [fetchPostAddCvOneLanguages.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchPostAddCvOneLanguages.fulfilled]: (state, action) => {
      state.objNew = initialState.objNew;
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
  updateItemLanguageFiledNew,
} = slice.actions;

export const { reducer } = slice;
