import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { handleCVUpdateDrawingTrue } from "../slices/resumeData";

// all list
export const fetchGetCvReferences = createAsyncThunk('interhip/fetchGetCvReferences', async ({ idCv, isDrawing = false }, thunkAPI) => {
    const response = await api.references.getListReferences(idCv);

    if (isDrawing)
        await thunkAPI.dispatch(handleCVUpdateDrawingTrue());

    return response;
});

export const fetchPostAddCvOneReferences = createAsyncThunk('interhip/fetchPostAddCvOneReferences', async ({ idCv, position }, thunkAPI) => {
    const { references: { objNew } } = thunkAPI.getState();

    const response = await api.references.addReferencesItem(idCv, { ...objNew, position });
    await thunkAPI.dispatch(fetchGetCvReferences({ idCv, isDrawing: true }));
    return response;
});

export const fetchPostUpdatePositionReferences = createAsyncThunk('countrus/fetchPostUpdatePositionReferences', async ({ idCv, data }, thunkAPI) => {
    const response = await api.references.updatePosition(data);
    await thunkAPI.dispatch(fetchGetCvReferences({ idCv, isDrawing: true }));
    return response;
});

export const fetchDeleteReferences = createAsyncThunk('interhip/fetchDeleteReferences', async ({ idCv, id }, thunkAPI) => {
    const response = await api.references.deleteReferencesItem(id);
    await thunkAPI.dispatch(fetchGetCvReferences({ idCv, isDrawing: true }));
    return response;
});

export const fetchDeleteAll = createAsyncThunk('references/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.references.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetCvReferences({ idCv, isDrawing: true }));
    return response;
});

export const fetchUpdateReferences = createAsyncThunk('interhip/fetchUpdateReferences', async ({ index }, thunkAPI) => {
    const { references: { referencesObj } } = thunkAPI.getState();
    let { id, fullName, ...obj } = referencesObj[index];

    obj.full_name = fullName;

    const response = await api.references.updateReferencesItem(id, obj);
    await thunkAPI.dispatch(handleCVUpdateDrawingTrue());

    return response;
});

