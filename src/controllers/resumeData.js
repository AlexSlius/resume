import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

// all list
export const fetchGetResumeData = createAsyncThunk('resumeData/fetchGetResumeData', async ({ idCv }) => {
    const response = await api.resumesData.getResumeData(idCv);
    return response;
});
