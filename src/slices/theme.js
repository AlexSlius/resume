import { createSlice } from '@reduxjs/toolkit';

import { statusLoaded, statusLoader } from '../constants/statuses';

const initialState = {
    currentResolution: null,
    status: statusLoaded,
    isMenuOpen: false,
    isOpenPreviesMobTemplate: false,
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
        updatePreviewsMobTemplateStatus(state, action) {
            state.isOpenPreviesMobTemplate = !state.isOpenPreviesMobTemplate;
        },
    },
    extraReducers: {}
});

export const {
    updateResolution,
    updateMenuStatus,
    updatePreviewsMobTemplateStatus,
} = slice.actions;

export const { reducer } = slice;
