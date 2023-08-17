import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

import {
    sessionStorageRemove
} from '../helpers/localStorage';

import { handleCVUpdateDrawingTrue } from "../slices/resumeData";

// all list
export const getResumesTemplates = createAsyncThunk('resumeData/fetchGetResumesTemplates', async ({ params, isNew = false }) => {
    const response = await api.resumesData.getResumesTemplates(params);

    return { isNew, ...response };
});

export const fetchGetResumeData = createAsyncThunk('resumeData/fetchfetchGetResumeData', async ({ idCv }) => {
    const response = await api.resumesData.fetchGetResumeData(idCv);
    return response;
});

export const getResumeDataShare = createAsyncThunk('resumeData/getResumeDataShare', async ({ idCv, key }) => {
    const response = await api.resumesData.getResumeDataShare(idCv, key);
    return response;
});

export const getResumeShareTemplateActive = createAsyncThunk('resumeData/getResumeShareTemplateActive', async ({ idCv }, thunkAPI) => {
    const response = await api.resumesData.getResumeShareTemplateActive(idCv);
    await thunkAPI.dispatch(handleCVUpdateDrawingTrue());
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

export const getResumeActive = createAsyncThunk('resumeData/getResumeActive', async ({ idCv }, thunkAPI) => {
    const response = await api.resumesData.getResumeDataActive(idCv);
    return response;
});
