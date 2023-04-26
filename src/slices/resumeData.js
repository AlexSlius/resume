import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    getResumesTemplates,
    fetchGetResumeData,
    getResumeActive,
    getResumeShareTemplateActive,
    getResumeDataShare,
} from "../controllers/resumeData";

const initialState = {
    list: {
        items: [],
        count_pages: 0,
    },
    data: {},
    resumeActive: null,
    resumeActiveNew: {
        slug: "001-CV",
        id: 1,
        colors: [],
        template_class: "",
        template_line_spacing: "",
        template_text_size: "",
    },
    status: statusLoaded,
    statusResumeActive: statusLoaded,
};

export const slice = createSlice({
    name: 'resumeData',
    initialState,
    reducers: {
        updateActiveResumeNew(state, action) {
            state.resumeActiveNew = { ...state.resumeActiveNew, ...action.payload };
        },
        updateActiveResume(state, action) {
            state.resumeActive = { ...state.resumeActive, ...action.payload };
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                list: { ...state.list, ...action.payload.resumeData.list },
                data: { ...state.data, ...action.payload.resumeData.data },
                resumeActive: { ...state.resumeActive, ...action.payload.resumeData.resumeActive },
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
            // state.list = action.payload;
            state.list = { items: [...state.list.items, ...action.payload.items], count_pages: action.payload.count_pages };
        },
        // get data
        [fetchGetResumeData.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchGetResumeData.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.data = action.payload;
        },
        [getResumeDataShare.pending]: (state) => {
            state.status = statusLoader;
        },
        [getResumeDataShare.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.data = action.payload;
        },
        // getResumeShareTemplateActive
        [getResumeShareTemplateActive.pending]: (state) => {
            state.statusResumeActive = statusLoader;
        },
        [getResumeShareTemplateActive.fulfilled]: (state, action) => {
            state.statusResumeActive = statusLoaded;
            state.resumeActive = action.payload;
        },
    }
});

export const {
    updateActiveResumeNew,
    updateActiveResume
} = slice.actions;

export const { reducer } = slice;
