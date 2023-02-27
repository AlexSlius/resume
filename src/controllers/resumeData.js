import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

import {
    sessionStorageRemove
} from '../helpers/localStorage';

// all list
export const getResumesTemplates = createAsyncThunk('resumeData/fetchGetResumesTemplates', async () => {
    const response = await api.resumesData.getResumesTemplates();
    return response;
});

export const fetchGetResumeData = createAsyncThunk('resumeData/fetchfetchGetResumeData', async ({ idCv }) => {
    const response = await api.resumesData.fetchGetResumeData(idCv);
    return response;
});

export const setUpdateResumeActive = createAsyncThunk('resumeData/setUpdateResumeActive', async ({ idCv, data, isGet = false, isRemoveSesion = false }, thunkAPI) => {
    const response = await api.resumesData.setUpdateResumeDataActive(idCv, data);

    if (response) {
        if (isRemoveSesion) {
            sessionStorageRemove("typeResume");
        }

        if (isGet) {
            await thunkAPI.dispatch(getResumeActive({ idCv }));
        }
    }

    return response;
});

export const getResumeActive = createAsyncThunk('resumeData/getResumeActive', async ({ idCv }) => {
    const response = await api.resumesData.getResumeDataActive(idCv);
    return response;
});
