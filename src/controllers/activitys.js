import { createAsyncThunk } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

import api from "../apiSingleton";

// all list
export const fetchGetCvActivitys = createAsyncThunk('education/fetchGetCvActivitys', async ({ idCv, isPage = false }, thunkAPI) => {
    const response = await api.activitys.getListActivitys(idCv);

    if (isPage) {
        if (isArray(response) && response?.length == 0)
            await thunkAPI.dispatch(fetchPostAddCvOneActivitys({ idCv }));
    }

    return response;
});

export const fetchPostAddCvOneActivitys = createAsyncThunk('education/fetchPostAddCvOneActivitys', async ({ idCv }, thunkAPI) => {
    const { activitys: { objNew } } = thunkAPI.getState();

    const response = await api.activitys.addActivitysItem(idCv, objNew);
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

    obj.date_from = dateFrom.date;
    obj.date_to = dateTo.date;

    const response = await api.activitys.updateActivitysItem(id, obj);
    return response;
});

