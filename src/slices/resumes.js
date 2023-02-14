import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    fetchGetResumesList
} from "../controllers/resumes";

const initialState = {
    list: [],
    status: statusLoaded,
};

export const slice = createSlice({
    name: 'resumers',
    initialState,
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
              ...state,
              ...action.payload.resumers,
            }
          },
        [fetchGetResumesList.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchGetResumesList.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.list = action.payload;
        },
    }
});

export const { reducer } = slice;
