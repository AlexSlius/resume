import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
  fetchGetAllLinks,
  fetchDeleteAll,
} from "../controllers/socials";

const initialState = {
  socialObj: [],
  socialObjNew: {
    name: '',
    link: '',
  },
  status: statusLoaded,
  statusList: statusLoaded
};

export const slice = createSlice({
  name: 'socials',
  initialState,
  reducers: {
    updateItemSocialFiled(state, action) {
      let { index, name, value } = action.payload;
      state.socialObj[index][name] = value;
    },
    updateItemSocialFiledNew(state, action) {
      let { name, value } = action.payload;
      state.socialObjNew[name] = value;
    },
    cleanSlise(state, action) {
      state.socialObj = initialState.socialObj;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      let objData = !!action?.payload?.resumeData?.data?.social_links ? action.payload.resumeData.data.social_links : action.payload.socials.socialObj;

      return {
        ...state,
        socialObj: objData,
      }
    },
    // delete all
    [fetchDeleteAll.pending]: (state) => {
      state.socialObjNew = initialState.socialObjNew;
      state.status = statusLoader;
    },
    [fetchDeleteAll.fulfilled]: (state, action) => {
      state.status = statusLoaded;
    },
    // get list skills all
    [fetchGetAllLinks.pending]: (state) => {
      state.statusList = statusLoader;
    },
    [fetchGetAllLinks.fulfilled]: (state, action) => {
      state.statusList = statusLoaded;
      state.socialObj = action.payload;
    },
  }
});

export const {
  updateItemSocialFiled,
  updateItemSocialFiledNew,
  cleanSlise,
} = slice.actions;

export const { reducer } = slice;
