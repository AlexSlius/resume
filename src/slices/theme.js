import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

const initialState = {
    currentResolution: null,
    status: statusLoaded,
};

export const slice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateResolution(state, action) {
            state.currentResolution = action.payload;
        },
    },
    extraReducers: {}
});

export const {
    updateResolution,
} = slice.actions;

export const { reducer } = slice;
