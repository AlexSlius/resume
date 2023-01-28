import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    fetchUserGetAvatar,
    fetchUserDeleteProfile
} from "../controllers/users";

const initialState = {
    avatar: null,
    status: statusLoaded,
    statusDelete: statusLoaded,
};

export const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        // get avatar
        [fetchUserGetAvatar.pending]: (state, action) => {
            state.status = statusLoader;
        },
        [fetchUserGetAvatar.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.avatar = action.payload;
        },
        // delete profile
        [fetchUserDeleteProfile.pending]: (state, action) => {
            state.statusDelete = statusLoader;
        },
        [fetchUserDeleteProfile.fulfilled]: (state, action) => {
            state.statusDelete = statusLoaded;
        },
    }
});

// export const {
//     updateItemSkillsFiled,
// } = slice.actions;

export const { reducer } = slice;
