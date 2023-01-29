import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    fetchGetCategoryStatus,
    fetchPostUpdateCategoryStatus,
} from "../controllers/addSections";

const initialState = {
    list: [],
    status: statusLoaded,
};

export const slice = createSlice({
    name: 'addSection',
    initialState,
    extraReducers: {
        [fetchGetCategoryStatus.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchGetCategoryStatus.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.list = action.payload;
        },
        [fetchPostUpdateCategoryStatus.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchPostUpdateCategoryStatus.fulfilled]: (state, action) => {
            state.status = statusLoaded;
        },
    }
});

export const { reducer } = slice;
