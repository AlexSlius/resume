import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../../apiSingleton";

import {
    sessionStorageRemove
} from '../../helpers/localStorage';

// all list
export const getCoverTemplates = createAsyncThunk('resumeData/fetchGetResumesTemplates', async (params) => {
    const response = await api.coverData.getCoverTemplates(params);
    return response;
});

export const setUpdateCoverDataActive = createAsyncThunk('resumeData/setUpdateCoverDataActive', async ({ idCv, data, isGet = false, isRemoveSesion = false }, thunkAPI) => {
    const response = await api.coverData.setUpdateCoverDataActive(idCv, data);

    if (response) {
        if (isRemoveSesion) {
            sessionStorageRemove("typeResume");
        }

        if (isGet) {
            await thunkAPI.dispatch(getCoverDataActive({ idCv }));
        }
    }

    return response;
});

export const getCoverDataActive = createAsyncThunk('resumeData/getCoverDataActive', async ({ idCv }) => {
    const response = await api.coverData.getCoverDataActive(idCv);
    return response || null;
});

export const getCoverShareTemplateActive = createAsyncThunk('resumeData/getCoverShareTemplateActive', async ({ idCv }) => {
    const response = await api.coverData.getCoverShareTemplateActive(idCv);
    return response || null;
});