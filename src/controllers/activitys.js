import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { addNewF, updateF } from '../helpers/dataController';
import { handleCVUpdateDrawingTrue } from "../slices/resumeData";

// all list
export const fetchGetCvActivitys = createAsyncThunk('education/fetchGetCvActivitys', async ({ idCv, isDrawing = false }, thunkAPI) => {
    const response = await api.activitys.getListActivitys(idCv);

    if (isDrawing)
        await thunkAPI.dispatch(handleCVUpdateDrawingTrue());

    return response;
});

export const fetchPostUpdatePositionActivitys = createAsyncThunk('countrus/fetchPostUpdatePositionActivitys', async ({ idCv, data }, thunkAPI) => {
    const response = await api.activitys.updatePosition(data);
    await thunkAPI.dispatch(fetchGetCvActivitys({ idCv, isDrawing: true }));
    return response;
});

export const fetchPostAddCvOneActivitys = createAsyncThunk('education/fetchPostAddCvOneActivitys', async ({ idCv, position }, thunkAPI) => {
    const { activitys: { objNew } } = thunkAPI.getState();

    const response = await api.activitys.addActivitysItem(idCv, { ...addNewF(objNew), position });
    await thunkAPI.dispatch(fetchGetCvActivitys({ idCv, isDrawing: true }));

    return response;
});

export const fetchDeleteActivitys = createAsyncThunk('countrus/fetchDeleteHobie', async ({ idCv, id }, thunkAPI) => {
    const response = await api.activitys.deleteActivitysItem(id);
    await thunkAPI.dispatch(fetchGetCvActivitys({ idCv, isDrawing: true }));

    return response;
});

export const fetchDeleteAll = createAsyncThunk('activitys/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.activitys.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetCvActivitys({ idCv, isDrawing: true }));

    return response;
});

export const fetchUpdateActivitys = createAsyncThunk('countrus/fetchUpdateActivitys', async ({ index }, thunkAPI) => {
    const { activitys: { activityObj } } = thunkAPI.getState();
    let { id, ...obj } = activityObj[index];

    const response = await api.activitys.updateActivitysItem(id, updateF(obj, true));
    await thunkAPI.dispatch(handleCVUpdateDrawingTrue());
    
    return response;
});

