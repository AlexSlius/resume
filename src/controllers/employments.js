import { createAsyncThunk } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

import api from "../apiSingleton";

// all list
export const fetchGetCvEmployments = createAsyncThunk('employment/fetchGetCvEmployments', async ({ idCv, isPage = false }, thunkAPI) => {
    const response = await api.employments.getListEmployment(idCv);

    if (isPage) {
        if (isArray(response) && response?.length == 0)
            await thunkAPI.dispatch(fetchPostAddCvOneEmployment({ idCv }));
    }

    return response;
});

export const fetchPostAddCvOneEmployment = createAsyncThunk('employment/fetchPostAddCvOneEmployment', async ({ idCv }, thunkAPI) => {
    const { employment: { objNew } } = thunkAPI.getState();
    const response = await api.employments.addEmploymentItem(idCv, objNew);

    await thunkAPI.dispatch(fetchGetCvEmployments({ idCv }));
    return response;
});

export const fetchDeleteEmployment = createAsyncThunk('employment/fetchDeleteHobie', async ({ idCv, id }, thunkAPI) => {
    const response = await api.employments.deleteEmploymentItem(id);
    await thunkAPI.dispatch(fetchGetCvEmployments({ idCv }));
    return response;
});

export const fetchUpdateEmployment = createAsyncThunk('employment/fetchUpdateEmployment', async ({ index }, thunkAPI) => {
    const { employment: { employmentObj } } = thunkAPI.getState();
    let { id, periodFrom, periodTo, ...obj } = employmentObj[index];

    obj.period_from = periodFrom.date;
    obj.period_to = periodTo.date;

    const response = await api.employments.updateEmploymentItem(id, obj);
    return response;
});

