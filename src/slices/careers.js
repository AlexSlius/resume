import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { isString } from 'lodash';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    fetchGetCvCarreers,
    fetchDeleteAll,
    fetchUpdateServer
} from "../controllers/careers";

const initialState = {
    data: "",
    searchJobTitle: "",
    isData: false,
    status: statusLoaded,
};

export const slice = createSlice({
    name: 'careers',
    initialState,
    reducers: {
        updateCareer(state, action) {
            state.data = action.payload;
        },
        addCareer(state, action) {
            if (isString(state.data)) {
                state.data = state.data + action.payload;
            } else {
                state.data = action.payload;
            }
        },
        updateFieldSearchJobTitle(state, action) {
            state.searchJobTitle = action.payload;
        }
    },
    extraReducers: {
        // career_objective
        [HYDRATE]: (state, action) => {
            let objData = !!action?.payload?.resumeData?.data?.career_objective?.[0] ? action.payload.resumeData.data.career_objective[0].data : action.payload.careers.data;

            return {
                ...state,
                data: objData,
            }
        },
        [fetchUpdateServer.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchUpdateServer.fulfilled]: (state, action) => {
            state.status = statusLoaded;
        },
        // clean all
        [fetchDeleteAll.pending]: (state) => {
            state.data = "";
            state.status = statusLoader;
        },
        [fetchDeleteAll.fulfilled]: (state, action) => {
            state.status = statusLoaded;
        },
        // get 
        [fetchGetCvCarreers.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchGetCvCarreers.fulfilled]: (state, action) => {
            state.status = statusLoaded;

            if (!!action.payload?.id_job_title) {
                state.isData = true;
            }

            state.data = action?.payload?.data || initialState.data;
        },
    }
});

export const {
    updateCareer,
    addCareer,
    updateFieldSearchJobTitle
} = slice.actions;

export const { reducer } = slice;
