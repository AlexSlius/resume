import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { isArray } from 'lodash';

export const fetchGetCvCarreers = createAsyncThunk('careers/fetchGetCvCarreers', async ({ idCv }, thunkAPI) => {
    const response = await api.careers.getCvCarreers(idCv);
    return isArray(response) ? "" : response;
});

export const fetchDeleteAll = createAsyncThunk('careers/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.careers.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetCvCarreers({ idCv }));
    return response;
});

export const fetchUpdateServer = createAsyncThunk('careers/fetchUpdateServer', async ({ idCv }, thunkAPI) => {
    const { careers: { data } } = thunkAPI.getState();
    const response = await api.careers.update(idCv, { data });
    await thunkAPI.dispatch(fetchGetCvCarreers({ idCv }));
    return response;
});