import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

// all list
export const fetchGetCvLanguages = createAsyncThunk('languages/fetchGetCvLanguages', async ({ idCv }, thunkAPI) => {
    const response = await api.languages.getListLanguages(idCv);
    return response;
});

export const fetchPostAddCvOneLanguages = createAsyncThunk('languages/fetchPostAddCvOneLanguages', async ({ idCv }, thunkAPI) => {
    const { languages: { objNew: { language, level } } } = thunkAPI.getState();

    const response = await api.languages.addLanguagesItem(idCv, { language, level });
    await thunkAPI.dispatch(fetchGetCvLanguages({ idCv }));
    return response;
});

export const fetchDeleteLanguages = createAsyncThunk('languages/fetchDeleteLanguages', async ({ idCv, id }, thunkAPI) => {
    const response = await api.languages.deleteLanguagesItem(id);
    await thunkAPI.dispatch(fetchGetCvLanguages({ idCv }));
    return response;
});

export const fetchUpdateLanguages = createAsyncThunk('languages/fetchUpdateLanguages', async ({ index }, thunkAPI) => {
    const { languages: { languageObj } } = thunkAPI.getState();

    const obj = languageObj[index];
    const response = await api.languages.updateLanguagesItem(obj.id, obj);
    return response;
});

export const fetchDeleteAll = createAsyncThunk('skills/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.languages.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetCvLanguages({ idCv }));
    return response;
});


