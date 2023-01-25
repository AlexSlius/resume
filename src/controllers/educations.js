import { createAsyncThunk } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

import api from "../apiSingleton";

// all list
export const fetchGetCvEducations = createAsyncThunk('education/fetchGetCvEducations', async ({ idCv }, thunkAPI) => {
    const response = await api.educations.getListEducation(idCv);
    return response;
});

export const fetchPostAddCvOneEducation = createAsyncThunk('education/fetchPostAddCvOneEducation', async ({ idCv }, thunkAPI) => {
    const { educations: { objNew } } = thunkAPI.getState();

    const response = await api.educations.addEducationItem(idCv, objNew);
    await thunkAPI.dispatch(fetchGetCvEducations({ idCv }));
    return response;
});

export const fetchDeleteEducation = createAsyncThunk('countrus/fetchDeleteHobie', async ({ idCv, id }, thunkAPI) => {
    const response = await api.educations.deleteEducationItem(id);
    await thunkAPI.dispatch(fetchGetCvEducations({ idCv }));
    return response;
});

export const fetchUpdateEducation = createAsyncThunk('countrus/fetchUpdateEducation', async ({ index }, thunkAPI) => {
    const { educations: { educationObj } } = thunkAPI.getState();
    let { id, dateFrom, dateTo, ...obj } = educationObj[index];

    obj.period_from = dateFrom.date;
    obj.period_to = dateTo.date;

    const response = await api.educations.updateEducationItem(id, obj);
    return response;
});

