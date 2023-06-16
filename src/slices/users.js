import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    fetchUserGetAvatar,
    fetchUserDeleteProfile,
    fetchUserGetProfile,
    getUserDataSettings
} from "../controllers/users";
import { isArray } from 'lodash';

const initialState = {
    objForm: {
        firstName: "",
        lastName: "",
        username: "",
        updatesAndOffersNotification: 0,
        resumeAnalyticsNotification: 0,
        resumeAndJobNotification: 0,
    },
    objFormSettings: {
        email: "",
        firstName: "",
        lastName: "",
    },
    isSubscribe: false,
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
        updateSettingsFrom(state, action) {
            let { name, value } = action.payload;
            state.objFormSettings[name] = value;
        },
    },
    extraReducers: {
        // [HYDRATE]: (state, action) => {
        //     return {
        //         ...state,
        //         ...action.payload.users,
        //     }
        // },
        // get avatar
        [fetchUserGetAvatar.pending]: (state, action) => {
            state.statusAvatar = statusLoader;
        },
        [fetchUserGetAvatar.fulfilled]: (state, action) => {
            state.statusAvatar = statusLoaded;
            state.avatar = action?.payload || state.avatar == initialState.avatar;
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
            state.status = statusLoader;
        },
        [fetchUserGetProfile.fulfilled]: (state, action) => {
            state.objForm = action.payload?.user || initialState.objForm;
            state.isSubscribe = action.payload?.isSubscribe || initialState.isSubscribe;
            state.status = statusLoaded;
        },
        //get settings
        [getUserDataSettings.pending]: (state, action) => {
            state.status = statusLoader;
        },
        [getUserDataSettings.fulfilled]: (state, action) => {
            if (!(isArray(action.payload) && action.payload?.length == 0))
                state.objFormSettings = action.payload;
            state.status = statusLoaded;
        },
    }
});

export const {
    updateItemSettingsFiled,
    updateSettingsFrom,
} = slice.actions;

export const { reducer } = slice;
