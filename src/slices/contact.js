import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import {
  contactSetNew,
  getBasicContact,
  contactAddNew
} from "../controllers/contacts";

import { statusLoaded, statusLoader } from '../constants/statuses';

const initialState = {
  contactObj: {
    id: "",
    firstName: "",
    lastName: "",
    job_title: "",
    picture: null,
    email: "",
    phone: "",
    country: "",
    nationality: "",
    city: "",
    address: "",
    zipCode: "",
    driverLicense: "",
    placeOfBirth: "",
    dateOfBirth: null,
    jobTitleId: null,
  },
  contactObjNew: {
    firstName: "",
    lastName: "",
    job_title: "",
    picture: null,
    email: "",
    phone: "",
    country: "",
    nationality: "",
    city: "",
    address: "",
    zipCode: "",
    driverLicense: "",
    placeOfBirth: "",
    dateOfBirth: null,
    jobTitleId: null,
  },
  status: statusLoaded,
  statusNew: statusLoaded,
};

export const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    updateItemFieldContact(state, action) {
      let { name, value } = action.payload;
      state.contactObj[name] = value;
      state.contactObjNew[name] = value;
    },
    updatePictureContact(state, action) {
      state.contactObj.picture = action.payload;
      state.contactObjNew.picture = action.payload;
    },
    cleanSlise(state, action) {
      state.contactObj = initialState.contactObj;
    },
    cleanSliseNew(state, action) {
      state.contactObjNew = initialState.contactObjNew;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      let objData = !!action?.payload?.resumeData?.data?.contact?.[0] ? action.payload.resumeData.data.contact[0] : action.payload.contacts.contactObj;

      return {
        ...state,
        contactObj: {
          ...state.contactObj,
          ...objData,
        }
      }
    },
    // get
    [getBasicContact.pending]: (state) => {
      state.contactObj = initialState.contactObj;
      state.status = statusLoader;
    },
    [getBasicContact.fulfilled]: (state, action) => {
      state.status = statusLoaded;
      state.contactObj = action.payload;
    },
    // new
    [contactSetNew.pending]: (state) => {
      state.statusNew = statusLoader;
    },
    [contactSetNew.fulfilled]: (state) => {
      state.statusNew = statusLoaded;
    },
    // new add
    [contactAddNew.pending]: (state) => {
      state.statusNew = statusLoader;
    },
    [contactAddNew.fulfilled]: (state) => {
      state.statusNew = statusLoaded;
    }
  }
});

export const {
  updateItemFieldContact,
  updatePictureContact,
  cleanSlise,
  cleanSliseNew,
} = slice.actions;

export const { reducer } = slice;
