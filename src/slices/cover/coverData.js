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
    resumeActive: null,
    resumeActiveNew: {
        slug: "001-CV",
        id: 1,
        template_class: "",
        colors: [],
        template_line_spacing: "",
        template_text_size: "",
    },
    status: statusLoaded,
    statusResumeActive: statusLoaded,
};

export const slice = createSlice({
    name: 'coverData',
    initialState,
    reducers: {
        updateActiveCoverNew(state, action) {
            state.resumeActiveNew = { ...state.resumeActiveNew, ...action.payload };
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                list: { ...state.list, ...action.payload.coverData.list },
                data: { ...state.data, ...action.payload.coverData.data },
                resumeActive: { ...state.resumeActive, ...action.payload.coverData.resumeActive },
            }
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
            state.list = { items: [...state.list.items, ...action.payload.items], count_pages: action.payload.count_pages };
        },
    }
});

export const {
    updateActiveCoverNew
} = slice.actions;

export const { reducer } = slice;
