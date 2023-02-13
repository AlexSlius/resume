import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

export const fetchAddItemLink = createAsyncThunk('link/fetchAddItemLink', async ({ idCv, data }, thunkAPI) => {
    const response = await api.social.addItemSocial(idCv, data);
    await thunkAPI.dispatch(fetchGetAllLinks({ idCv }));
    return response;
});

export const fetchGetAllLinks = createAsyncThunk('link/fetchGetAllLinks', async ({ idCv }, thunkAPI) => {
    const response = await api.social.getAllLisk(idCv);
    return response;
});

export const fetchUpdateItemLink = createAsyncThunk('link/fetchUpdateItemLink', async ({ idCv, id, data }, thunkAPI) => {
    const response = await api.social.postUpdateItemLink(id, data);
    await thunkAPI.dispatch(fetchGetAllLinks({ idCv }));
    return response;
});

export const fetchDeleteItemLink = createAsyncThunk('link/fetchDeleteItemLink', async ({ idCv, id }, thunkAPI) => {
    const response = await api.social.deleteItemLink(id);
    await thunkAPI.dispatch(fetchGetAllLinks({ idCv }));
    return response;
});

export const fetchDeleteAll = createAsyncThunk('social/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.social.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetAllLinks({ idCv }));
    return response;
});
