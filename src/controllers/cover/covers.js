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

// postShareResume
export const postShareCover = createAsyncThunk('resumes/postShareCover', async ({ id }, thunkAPI) => {
    const response = await api.covers.postShare(id, { status: "share" });
    return response;
});

export const deleteCover = createAsyncThunk('resumes/deleteCover', async ({ id }, thunkAPI) => {
    const response = await api.covers.deleteCover(id);
    await thunkAPI.dispatch(fetchGetCoversList());
    return response;
});
