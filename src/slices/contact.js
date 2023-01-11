import { createSlice } from '@reduxjs/toolkit';

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
  }
});

export const { setContact, updateItemFieldContact, updatePictureContact } = slice.actions;

export const { reducer } = slice;
