import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

const initialState = {
    currentResolution: null,
    status: statusLoaded,
    isMenuOpen: false,
};

export const slice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        updateResolution(state, action) {
            state.currentResolution = action.payload;
        },
        updateMenuStatus(state, action) {
            state.isMenuOpen = action.payload;
        },
    },
    extraReducers: {}
});

export const {
    updateResolution,
    updateMenuStatus,
} = slice.actions;

export const { reducer } = slice;
