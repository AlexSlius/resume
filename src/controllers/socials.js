import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { handleCVUpdateDrawingTrue } from "../slices/resumeData";

export const fetchAddItemLink = createAsyncThunk('link/fetchAddItemLink', async ({ idCv, data }, thunkAPI) => {
    const response = await api.social.addItemSocial(idCv, data);
    await thunkAPI.dispatch(fetchGetAllLinks({ idCv, isDrawing: true }));
    return response;
});

export const fetchGetAllLinks = createAsyncThunk('link/fetchGetAllLinks', async ({ idCv, isDrawing = false }, thunkAPI) => {
    const response = await api.social.getAllLisk(idCv);

    if (isDrawing)
        await thunkAPI.dispatch(handleCVUpdateDrawingTrue());

    return response;
});

export const fetchUpdateItemLink = createAsyncThunk('link/fetchUpdateItemLink', async ({ idCv, id, data }, thunkAPI) => {
    const response = await api.social.postUpdateItemLink(id, data);
    await thunkAPI.dispatch(fetchGetAllLinks({ idCv, isDrawing: true }));
    return response;
});

export const fetchDeleteItemLink = createAsyncThunk('link/fetchDeleteItemLink', async ({ idCv, id }, thunkAPI) => {
    const response = await api.social.deleteItemLink(id);
    await thunkAPI.dispatch(fetchGetAllLinks({ idCv, isDrawing: true }));
    return response;
});

export const fetchDeleteAll = createAsyncThunk('social/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.social.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetAllLinks({ idCv, isDrawing: true }));
    return response;
});
