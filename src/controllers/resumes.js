import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

// all list
export const fetchGetResumesList = createAsyncThunk('resumes/fetchGetResumesList', async () => {
    const response = await api.resumes.getResumesAll();
    return response;
});