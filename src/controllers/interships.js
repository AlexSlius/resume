import { createAsyncThunk } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

import api from "../apiSingleton";

// all list
export const fetchGetCvInternships = createAsyncThunk('interhip/fetchGetCvInternships', async ({ idCv }, thunkAPI) => {
    const response = await api.internships.getListInternships(idCv);
    return response;
});

export const fetchPostAddCvOneInternships = createAsyncThunk('interhip/fetchPostAddCvOneInternships', async ({ idCv }, thunkAPI) => {
    const { interships: { objNew } } = thunkAPI.getState();

    const response = await api.internships.addInternshipsItem(idCv, objNew);
    await thunkAPI.dispatch(fetchGetCvInternships({ idCv }));
    return response;
});

export const fetchDeleteInternships = createAsyncThunk('interhip/fetchDeleteHobie', async ({ idCv, id }, thunkAPI) => {
    const response = await api.internships.deleteInternshipsItem(id);
    await thunkAPI.dispatch(fetchGetCvInternships({ idCv }));
    return response;
});

export const fetchUpdateInternships = createAsyncThunk('interhip/fetchUpdateInternships', async ({ index }, thunkAPI) => {
    const { interships: { interhipObj } } = thunkAPI.getState();
    let { id, dateFrom, dateTo, jobTitle, ...obj } = interhipObj[index];

    obj.period_from = dateFrom.date;
    obj.period_to = dateTo.date;
    obj.job_title = jobTitle;

    const response = await api.internships.updateInternshipsItem(id, obj);
    return response;
});

