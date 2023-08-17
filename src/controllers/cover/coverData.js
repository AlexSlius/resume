import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../../apiSingleton";

import {
    sessionStorageRemove
} from '../../helpers/localStorage';

import { handleUpdateDrawingTrue } from "../../slices/cover/coverDataForm";

// all list
export const getCoverTemplates = createAsyncThunk('resumeData/fetchGetCoversTemplates', async ({ params, isNew = false }) => {
    const response = await api.coverData.getCoverTemplates(params);
    return { isNew, ...response };
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

export const getCoverDataActive = createAsyncThunk('resumeData/getCoverDataActive', async ({ idCv }, thunkAPI) => {
    const response = await api.coverData.getCoverDataActive(idCv);
    await thunkAPI.dispatch(handleUpdateDrawingTrue());
    return response || null;
});

export const getCoverShareTemplateActive = createAsyncThunk('resumeData/getCoverShareTemplateActive', async ({ idCv }, thunkAPI) => {
    const response = await api.coverData.getCoverShareTemplateActive(idCv);
    await thunkAPI.dispatch(handleUpdateDrawingTrue());
    return response || null;
});