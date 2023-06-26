import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { handleCVUpdateDrawingTrue } from "../slices/resumeData";

export const fetchPostAddCvHobie = createAsyncThunk('countrus/fetchPostAddCvHobie', async ({ idCv, data }, thunkAPI) => {
    const response = await api.hobies.addItemHobie(idCv, data);
    await thunkAPI.dispatch(fetchGetCvHobie({ idCv }));
    await thunkAPI.dispatch(handleCVUpdateDrawingTrue());
    return response;
});

export const fetchGetCvHobie = createAsyncThunk('countrus/fetchGetCvHobie', async ({ idCv }, thunkAPI) => {
    const response = await api.hobies.getAllHobies(idCv);
    await thunkAPI.dispatch(handleCVUpdateDrawingTrue());
    return response;
});

export const fetchDeleteHobie = createAsyncThunk('countrus/fetchDeleteHobie', async ({ idCv, id }, thunkAPI) => {
    const response = await api.hobies.deleteItemHobie(id);
    await thunkAPI.dispatch(fetchGetCvHobie({ idCv }));
    return response;
});

export const fetchPostUpdatePositionHobie = createAsyncThunk('countrus/fetchPostUpdatefetchPostUpdatePositionHobie', async ({ idCv, data }, thunkAPI) => {
    const response = await api.hobies.updatePosition(data);
    await thunkAPI.dispatch(fetchGetCvHobie({ idCv }));
    await thunkAPI.dispatch(handleCVUpdateDrawingTrue());
    return response;
});

export const fetchDeleteAll = createAsyncThunk('hobies/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.hobies.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetCvHobie({ idCv }));
    return response;
});