import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';
import {
  fetchGetCvReferences,
  fetchPostAddCvOneReferences,
  fetchDeleteReferences
} from '../controllers/references';

const initialState = {
  referencesObj: [],
  objNew: {
    full_name: "",
    company: "",
    phone: "",
    email: "",
  },
  status: statusLoaded,
  statusNew: statusLoaded,
};

export const slice = createSlice({
  name: 'references',
  initialState,
  reducers: {
    updateItemFieldReference(state, action) {
      let { index, name, value } = action.payload;
      state.referencesObj[index][name] = value;
    },
    updateItemFieldReferenceNew(state, action) {
      let { name, value } = action.payload;
      state.objNew[name] = value;
    },
    updatePosition(state, action) {
      state.referencesObj = action.payload;
    },
  },
  extraReducers: {
    // delete 
    [fetchDeleteReferences.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchDeleteReferences.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // app
    [fetchPostAddCvOneReferences.pending]: (state) => {
      state.statusNew = statusLoader;
    },
    [fetchPostAddCvOneReferences.fulfilled]: (state, action) => {
      state.objNew = initialState.objNew;
      state.statusNew = statusLoaded;
    },
    // get
    [fetchGetCvReferences.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchGetCvReferences.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.referencesObj = action.payload;
    },
  }
});

export const {
  updateItemFieldReference,
  updateItemFieldReferenceNew,
  updatePosition
} = slice.actions;

export const { reducer } = slice;
