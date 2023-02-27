import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    getResumesTemplates,
    fetchGetResumeData,
    getResumeActive,
} from "../controllers/resumeData";

const initialState = {
    list: [],
    data: {},
    resumeActive: null,
    status: statusLoaded,
    statusResumeActive: statusLoaded,
};

export const slice = createSlice({
    name: 'resumeData',
    initialState,
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.resumeData,
            }
        },
        // get resume active
        [getResumeActive.pending]: (state) => {
            state.statusResumeActive = statusLoader;
        },
        [getResumeActive.fulfilled]: (state, action) => {
            state.statusResumeActive = statusLoaded;
            state.resumeActive = action.payload;
        },
        // get templates list
        [getResumesTemplates.pending]: (state) => {
            state.status = statusLoader;
        },
        [getResumesTemplates.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.list = action.payload;
        },
        // get data
        [fetchGetResumeData.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchGetResumeData.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.data = action.payload;
        },
    }
});

export const { reducer } = slice;
