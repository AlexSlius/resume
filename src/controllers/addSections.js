import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

// get
export const fetchGetCategoryStatus = createAsyncThunk('category/fetchGetCategoryStatus', async ({ idCv }, thunkAPI) => {
    const response = await api.addSection.getCategoryStatus(idCv);
    return response;
});

// update
export const fetchPostUpdateCategoryStatus = createAsyncThunk('category/fetchPostUpdateCategoryStatus', async ({ idCv, data }, thunkAPI) => {
    const response = await api.addSection.updateCategoryStatus(idCv, data);

    await thunkAPI.dispatch(fetchGetCategoryStatus({ idCv }));
    return response;
});

// viewed

export const getCategoryViewedStatus = createAsyncThunk('category/getCategoryViewedStatus', async ({ idCv }, thunkAPI) => {
    const response = await api.addSection.getCategoryViewedStatus(idCv);
    return response;
});

export const postUpdateCategoryViewedStatus = createAsyncThunk('category/postUpdateCategoryViewedStatus', async ({ idCv, category }, thunkAPI) => {
    const { addSection: { viewedList } } = thunkAPI.getState();

    if (viewedList?.[category]?.status === null) {
        const response = await api.addSection.postUpdateCategoryViewedStatus(idCv, category);
        await thunkAPI.dispatch(getCategoryViewedStatus({ idCv }));

        return response;
    }

    return [];
});
