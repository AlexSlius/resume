import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// import {
//   contactSetNew,
//   getBasicContact,
//   contactAddNew
// } from "../controllers/contacts";
import { statusLoaded, statusLoader } from '../../constants/statuses';

const initialState = {
    personObj: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        zipCode: "",
        state: "",
    },
    status: statusLoaded,
    statusNew: statusLoaded,
};

export const slice = createSlice({
    name: 'coverPerson',
    initialState,
    reducers: {
        updateItemField(state, action) {
            let { name, value } = action.payload;
            state.personObj[name] = value;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                personObj: {
                    ...state.personObj,
                    ...action.payload.coverPerson.personObj,
                }
            }
        },
        // // get
        // [getBasicContact.pending]: (state) => {
        //     state.contactObj = initialState.contactObj;
        //     state.status = statusLoader;
        // },
        // [getBasicContact.fulfilled]: (state, action) => {
        //     state.status = statusLoaded;
        //     state.contactObj = action.payload;
        // },
        // // new
        // [contactSetNew.pending]: (state) => {
        //     state.statusNew = statusLoader;
        // },
        // [contactSetNew.fulfilled]: (state) => {
        //     state.statusNew = statusLoaded;
        // },
        // // new add
        // [contactAddNew.pending]: (state) => {
        //     state.statusNew = statusLoader;
        // },
        // [contactAddNew.fulfilled]: (state) => {
        //     state.statusNew = statusLoaded;
        // }
    }
});

export const {
    updateItemField
} = slice.actions;

export const { reducer } = slice;
