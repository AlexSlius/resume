import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';

import {
    striteGetProductById,
    striteGetPlans,
} from "../controllers/strite";

const initialState = {
    product: null,
    plans: null,
    status: statusLoaded,
};

export const slice = createSlice({
    name: 'strite',
    initialState,
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return action.payload.strite;
        },
        // get product
        [striteGetProductById.pending]: (state) => {
            state.status = statusLoader;
        },
        [striteGetProductById.fulfilled]: (state, action) => {
            state.product = action.payload;
            state.status = statusLoaded;
        },
        // get plans
        [striteGetPlans.pending]: (state) => {
            state.status = statusLoader;
        },
        [striteGetPlans.fulfilled]: (state, action) => {
            state.plans = action.payload;
            state.status = statusLoaded;
        },

    }
});

export const { reducer } = slice;
