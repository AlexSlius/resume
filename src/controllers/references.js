import { createAsyncThunk } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

import api from "../apiSingleton";

// all list
export const fetchGetCvReferences = createAsyncThunk('interhip/fetchGetCvReferences', async ({ idCv }) => {
    const response = await api.references.getListReferences(idCv);
    return response;
});

export const fetchPostAddCvOneReferences = createAsyncThunk('interhip/fetchPostAddCvOneReferences', async ({ idCv, position }, thunkAPI) => {
    const { references: { objNew } } = thunkAPI.getState();

    const response = await api.references.addReferencesItem(idCv, { ...objNew, position });
    await thunkAPI.dispatch(fetchGetCvReferences({ idCv }));
    return response;
});

export const fetchPostUpdatePositionReferences = createAsyncThunk('countrus/fetchPostUpdatePositionReferences', async ({ idCv, data }, thunkAPI) => {
    const response = await api.references.updatePosition(data);
    await thunkAPI.dispatch(fetchGetCvReferences({ idCv }));
    return response;
});

export const fetchDeleteReferences = createAsyncThunk('interhip/fetchDeleteReferences', async ({ idCv, id }, thunkAPI) => {
    const response = await api.references.deleteReferencesItem(id);
    await thunkAPI.dispatch(fetchGetCvReferences({ idCv }));
    return response;
});

export const fetchUpdateReferences = createAsyncThunk('interhip/fetchUpdateReferences', async ({ index }, thunkAPI) => {
    const { references: { referencesObj } } = thunkAPI.getState();
    let { id, fullName, ...obj } = referencesObj[index];

    obj.full_name = fullName;

    const response = await api.references.updateReferencesItem(id, obj);
    return response;
});

