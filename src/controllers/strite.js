import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    striteApiGetProductById,
    striteApiGetPlans
} from '../strite/api';

export const striteGetProductById = createAsyncThunk('strite/striteGetProducts', async (_, thunkAPI) => {
    const response = await striteApiGetProductById();

    if (response?.id) {
        await thunkAPI.dispatch(striteGetPlans({ product: response.id }));
    }

    return response || null;
});

export const striteGetPlans = createAsyncThunk('strite/striteGetPlans', async ({ product }) => {
    const response = await striteApiGetPlans();

    if (response?.data) {
        return response.data.filter(el => el.product == product);
    }
});

