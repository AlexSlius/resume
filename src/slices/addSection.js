import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    fetchGetCategoryStatus,
    fetchPostUpdateCategoryStatus,
    getCategoryViewedStatus
} from "../controllers/addSections";

const initialState = {
    list: [],
    viewedList: null,
    status: statusLoaded,
    statusViewed: statusLoaded,
};

export const slice = createSlice({
    name: 'addSection',
    initialState,
    reducers: {
        cleanSlise(state, action) {
            state.list = initialState.list;
        },
    },
    extraReducers: {
        [getCategoryViewedStatus.pending]: (state) => {
            state.viewedList = initialState.viewedList;
            state.statusViewed = statusLoader;
        },
        [getCategoryViewedStatus.fulfilled]: (state, action) => {
            state.statusViewed = statusLoaded;
            state.viewedList = action.payload;
        },
        [fetchGetCategoryStatus.pending]: (state) => {
            state.list = initialState.list;
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

export const { cleanSlise } = slice.actions;

export const { reducer } = slice;
