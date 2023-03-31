import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../../apiSingleton";

// all list
export const fetchGetCoversList = createAsyncThunk('resumes/fetchGetCoversList', async () => {
    const response = await api.covers.getCoversAll();
    return response;
});

// update item name resume
export const fetchPostUpdateCover = createAsyncThunk('resumes/fetchPostUpdateCover', async ({ id, data }, thunkAPI) => {
    const response = await api.covers.fetchPostUpdateCover(id, data);
    return response;
});

