import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

// all list
export const getResumesTemplates = createAsyncThunk('resumeData/fetchGetResumesTemplates', async () => {
    const response = await api.resumesData.getResumesTemplates();
    return response;
});

export const fetchGetResumeData = createAsyncThunk('resumeData/fetchfetchGetResumeData', async ({ idCv }) => {
    const response = await api.resumesData.fetchGetResumeData(idCv);
    return response;
});
