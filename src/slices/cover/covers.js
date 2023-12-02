

import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../../constants/statuses';

import {
    fetchGetCoversList
} from "../../controllers/cover/covers";

const initialState = {
    list: [],
    status: statusLoaded,
    idDown: null
};

export const slice = createSlice({
    name: 'covers',
    initialState,
    reducers: {
        updateIdDownLetter(state, action) {
            state.idDown = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.covers,
            }
        },
        [fetchGetCoversList.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchGetCoversList.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.list = action.payload;
        },
    }
});

export const { updateIdDownLetter } = slice.actions;

export const { reducer } = slice;
