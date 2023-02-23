import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

// all list
export const fetchGetResumesList = createAsyncThunk('resumes/fetchGetResumesList', async () => {
    const response = await api.resumes.getResumesAll();
    return response;
});

// update item name resume
export const fetchPostUpdateResumes = createAsyncThunk('resumes/fetchPostUpdateResumes', async ({ id, data }, thunkAPI) => {
    const response = await api.resumes.postUpdateResumaName(id, data);
    // thunkAPI.dispatch(fetchGetResumesList());
    return response;
});

