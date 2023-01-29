import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    fetchUserGetAvatar,
    fetchUserDeleteProfile,
    fetchUserGetProfile
} from "../controllers/users";

const initialState = {
    objForm: {
        firstName: "",
        lastName: "",
        email: "",
        updatesAndOffersNotification: 0,
        resumeAnalyticsNotification: 0,
        resumeAndJobNotification: 0,
    },
    avatar: null,
    status: statusLoaded,
    statusAvatar: statusLoaded,
    statusDelete: statusLoaded,
};

export const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateItemSettingsFiled(state, action) {
            let { name, value } = action.payload;
            state.objForm[name] = value;
        },
    },
    extraReducers: {
        // get avatar
        [fetchUserGetAvatar.pending]: (state, action) => {
            state.statusAvatar = statusLoader;
        },
        [fetchUserGetAvatar.fulfilled]: (state, action) => {
            state.statusAvatar = statusLoaded;
            state.avatar = action.payload;
        },
        // delete profile
        [fetchUserDeleteProfile.pending]: (state, action) => {
            state.statusDelete = statusLoader;
        },
        [fetchUserDeleteProfile.fulfilled]: (state, action) => {
            state.statusDelete = statusLoaded;
        },
        //get profile
        [fetchUserGetProfile.pending]: (state, action) => {
            state.objForm = initialState.objForm;
            state.status = statusLoader;
        },
        [fetchUserGetProfile.fulfilled]: (state, action) => {
            state.objForm = action.payload;
            state.status = statusLoaded;
        },
    }
});

export const {
    updateItemSettingsFiled,
} = slice.actions;

export const { reducer } = slice;
