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
    return response;
});