import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    getResumesTemplates,
    fetchGetResumeData
} from "../controllers/resumeData";

const initialState = {
    list: [],
    data: {},
    status: statusLoaded,
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
