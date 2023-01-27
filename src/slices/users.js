import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    fetchUserGetAvatar
} from "../controllers/users";

const initialState = {
    avatar: null,
    status: statusLoaded,
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
    }
});

// export const {
//     updateItemSkillsFiled,
// } = slice.actions;

export const { reducer } = slice;
