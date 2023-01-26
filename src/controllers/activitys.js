import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

// all list
export const fetchGetCvActivitys = createAsyncThunk('education/fetchGetCvActivitys', async ({ idCv }, thunkAPI) => {
    const response = await api.activitys.getListActivitys(idCv);
    return response;
});

export const fetchPostUpdatePositionActivitys = createAsyncThunk('countrus/fetchPostUpdatePositionActivitys', async ({ idCv, data }, thunkAPI) => {
    const response = await api.activitys.updatePosition(data);
    await thunkAPI.dispatch(fetchGetCvActivitys({ idCv }));
    return response;
});

export const fetchPostAddCvOneActivitys = createAsyncThunk('education/fetchPostAddCvOneActivitys', async ({ idCv, position }, thunkAPI) => {
    const { activitys: { objNew } } = thunkAPI.getState();

    const response = await api.activitys.addActivitysItem(idCv, { ...objNew, position });
    await thunkAPI.dispatch(fetchGetCvActivitys({ idCv }));
    return response;
});

export const fetchDeleteActivitys = createAsyncThunk('countrus/fetchDeleteHobie', async ({ idCv, id }, thunkAPI) => {
    const response = await api.activitys.deleteActivitysItem(id);
    await thunkAPI.dispatch(fetchGetCvActivitys({ idCv }));
    return response;
});

export const fetchUpdateActivitys = createAsyncThunk('countrus/fetchUpdateActivitys', async ({ index }, thunkAPI) => {
    const { activitys: { activityObj } } = thunkAPI.getState();
    let { id, dateFrom, dateTo, ...obj } = activityObj[index];

    obj.period_from = dateFrom.date;
    obj.period_to = dateTo.date;

    const response = await api.activitys.updateActivitysItem(id, obj);
    return response;
});

