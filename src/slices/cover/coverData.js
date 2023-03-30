import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../../constants/statuses';

// import {
//     getResumesTemplates,
//     fetchGetcoverData,
//     getResumeActive,
// } from "../controllers/coverData";

import {
    getCoverTemplates,
} from "../../controllers/cover/coverData";

const initialState = {
    list: {
        items: [],
        count_pages: 0,
    },
    data: {},
    coverActive: null,
    coverActiveNew: {
        slug: "001-CV",
        id: 1,
        template_class: "",
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
            state.coverActiveNew = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                list: { ...state.list, ...action.payload.coverData.list },
                data: { ...state.data, ...action.payload.coverData.data },
                coverActive: { ...state.coverActive, ...action.payload.coverData.coverActive },
            }
        },
        // get resume active
        // [getResumeActive.pending]: (state) => {
        //     state.statusResumeActive = statusLoader;
        // },
        // [getResumeActive.fulfilled]: (state, action) => {
        //     state.statusResumeActive = statusLoaded;
        //     state.coverActive = action.payload;
        // },
        // get templates list
        [getCoverTemplates.pending]: (state) => {
            state.status = statusLoader;
        },
        [getCoverTemplates.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            // state.list = action.payload;
            state.list = { items: [...state.list.items, ...action.payload.items], count_pages: action.payload.count_pages };
        },
        // get data
        // [fetchGetcoverData.pending]: (state) => {
        //     state.status = statusLoader;
        // },
        // [fetchGetcoverData.fulfilled]: (state, action) => {
        //     state.status = statusLoaded;
        //     state.data = action.payload;
        // },
    }
});

export const {
    updateActiveCoverNew
} = slice.actions;

export const { reducer } = slice;
