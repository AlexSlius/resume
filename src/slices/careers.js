import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { isString } from 'lodash';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    fetchGetCvCarreers,
    fetchDeleteAll,
} from "../controllers/careers";

const initialState = {
    data: "",
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

            if (isString(action.payload) && action.payload.length > 0) {
                state.isData = true;
            }

            state.data = action.payload;
        },
    }
});

export const {
    updateCareer,
    addCareer
} = slice.actions;

export const { reducer } = slice;
