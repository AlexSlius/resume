import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { isSuccessNewContact } from '../helpers/checkingStatuses';
import { localStorageSet } from "../helpers/localStorage"

import { statusLoaded, statusLoader, statusError } from '../constants/statuses';
import { routersPages } from '../constants/next-routers';

export const contactSetNew = createAsyncThunk('fetch/setNewContact', async (dataImage, thunkAPI) => {
  const { contacts: { contactObj } } = thunkAPI.getState()

  const newObj = {
    date_of_birth: contactObj.dateOfBirth,
    driver_license: contactObj.driverLicense?.category || '',
    zip_code: contactObj.zipCode,
    city: contactObj.city?.name || '',
    phone: contactObj.phone,
    place_of_birth: contactObj.placeOfBirth,
    last_name: contactObj.lastName,
    address: contactObj.address,
    country: contactObj.country?.name || '',
    first_name: contactObj.firstName,
    nationality: contactObj.nationality?.name || '',
    email: contactObj.email,
    picture: dataImage
  }

  const response = await api.contact.setBaseInfo(newObj);

  if (isSuccessNewContact(response)) {
    localStorageSet("session_id", response.session_id);
    Router.push(`/${routersPages['login']}`);
  }

  return response;
})

const initialState = {
  contactObj: {
    id: "",
    firstName: "",
    lastName: "",
    picture: null,
    email: "",
    phone: "",
    country: {},
    nationality: {},
    city: {},
    address: "",
    zipCode: "",
    driverLicense: {},
    placeOfBirth: "",
    dateOfBirth: ""
  },
  status: "loaded"
};

export const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContact(state, action) {
      // state.contactObj[name] = value;
    },
    updateItemFieldContact(state, action) {
      let { name, value } = action.payload;
      state.contactObj[name] = value;
    },
    updatePictureContact(state, action) {
      state.contactObj.picture = action.payload;
    }
  },
  extraReducers: {
    [contactSetNew.pending]: (state) => {
      state.contactObj.status = statusLoaded;
    },
    [contactSetNew.fulfilled]: (state) => {
      state.contactObj.status = statusLoader;
    }
  }
});

export const { setContact, updateItemFieldContact, updatePictureContact } = slice.actions;

export const { reducer } = slice;
