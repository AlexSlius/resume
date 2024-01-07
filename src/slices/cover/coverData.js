import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../../constants/statuses';

import {
    getCoverTemplates,
    getCoverDataActive,
    getCoverShareTemplateActive,
} from "../../controllers/cover/coverData";

const initialState = {
    list: {
        items: [],
        count_pages: 0,
    },
    data: {},
    resumeActive: null,
    resumeActiveNew: {
        slug: "041-CV",
        id: 41,
        template_class: "",
        colors: [],
        template_line_spacing: "50",
        template_text_size: "50",
    },
    status: statusLoaded,
    statusResumeActive: statusLoaded,
};

export const slice = createSlice({
    name: 'coverData',
    initialState,
    reducers: {
        cleanCoverActive(state, action) {
            state.resumeActive = initialState.resumeActive;
        },
        updateActiveCoverNew(state, action) {
            state.resumeActiveNew = { ...state.resumeActiveNew, ...action.payload };
        },
        updateActiveCover(state, action) {
            state.resumeActive = { ...state.resumeActive, ...action.payload };
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.list = { ...state.list, ...action.payload.coverData.list };
            state.data = { ...state.data, ...action.payload.coverData.data };
            state.resumeActive = { ...state.resumeActive, ...action.payload.coverData.resumeActive };
        },
        // getCoverShareTemplateActive
        [getCoverShareTemplateActive.pending]: (state) => {
            state.statusResumeActive = statusLoader;
        },
        [getCoverShareTemplateActive.fulfilled]: (state, action) => {
            state.statusResumeActive = statusLoaded;
            state.resumeActive = action.payload;
        },
        // get resume active
        [getCoverDataActive.pending]: (state) => {
            state.statusResumeActive = statusLoader;
        },
        [getCoverDataActive.fulfilled]: (state, action) => {
            state.statusResumeActive = statusLoaded;
            state.resumeActive = action.payload;
        },
        // get templates list
        [getCoverTemplates.pending]: (state) => {
            state.status = statusLoader;
        },
        [getCoverTemplates.fulfilled]: (state, action) => {
            state.status = statusLoaded;

            if (action.payload?.isNew) {
                state.list = { items: action.payload.items, count_pages: action.payload.count_pages };
            }

            if (!action.payload?.isNew) {
                state.list = { items: [...state.list.items, ...action?.payload?.items || []], count_pages: action.payload.count_pages };
            }
        }
    }
});

export const {
    updateActiveCoverNew,
    updateActiveCover,
    cleanCoverActive
} = slice.actions;

export const { reducer } = slice;
