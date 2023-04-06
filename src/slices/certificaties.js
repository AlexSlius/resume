import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
  fetchPostAddCvOneCertificates,
  fetchGetCvCertificates,
  fetchDeleteAll,
} from "../controllers/certificaties";

const initialState = {
  certificatiesObj: [],
  ObjNew: {
    name: '',
  },
  status: statusLoaded,
};

export const slice = createSlice({
  name: 'certificaties',
  initialState,
  reducers: {
    updateItemCertificatieFiled(state, action) {
      let { index, name, value } = action.payload;
      state.certificatiesObj[index][name] = value;
    },
    updateItemCertificatieFiledNew(state, action) {
      let { name, value } = action.payload;
      state.ObjNew[name] = value;
    },
    cleanSlise(state, action) {
      state.certificatiesObj = initialState.certificatiesObj;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      let objData = !!action?.payload?.resumeData?.data?.certificates ? action.payload.resumeData.data.certificates : action.payload.certificaties.certificatiesObj;

      return {
        ...state,
        certificatiesObj: objData,
      }
    },
    // add
    [fetchPostAddCvOneCertificates.fulfilled]: (state, action) => {
      state.ObjNew = initialState.ObjNew;
    },
    // delete all
    [fetchDeleteAll.pending]: (state) => {
      state.objNew = initialState.ObjNew;
      state.status = statusLoader;
    },
    [fetchDeleteAll.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // get list 
    [fetchGetCvCertificates.pending]: (state) => {
      state.status = statusLoader;
    },
    [fetchGetCvCertificates.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.certificatiesObj = action.payload;
    },
  }
});

export const {
  updateItemCertificatieFiled,
  updateItemCertificatieFiledNew,
  cleanSlise
} = slice.actions;

export const { reducer } = slice;
