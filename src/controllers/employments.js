import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { addNewF, updateF } from '../helpers/dataController';

// all list
export const fetchGetCvEmployments = createAsyncThunk('employment/fetchGetCvEmployments', async ({ idCv }, thunkAPI) => {
    const response = await api.employments.getListEmployment(idCv);
    return response;
});

export const fetchPostAddCvOneEmployment = createAsyncThunk('employment/fetchPostAddCvOneEmployment', async ({ idCv, position }, thunkAPI) => {
    const { employment: { objNew } } = thunkAPI.getState();

    const response = await api.employments.addEmploymentItem(idCv, { ...addNewF(objNew), position: position });
    await thunkAPI.dispatch(fetchGetCvEmployments({ idCv }));
    return response;
});

export const fetchDeleteEmployment = createAsyncThunk('employment/fetchDeleteHobie', async ({ idCv, id }, thunkAPI) => {
    const response = await api.employments.deleteEmploymentItem(id);
    await thunkAPI.dispatch(fetchGetCvEmployments({ idCv }));
    return response;
});

export const fetchPostUpdatePositionEmployment = createAsyncThunk('countrus/fetchPostUpdatePositionEmployment', async ({ idCv, data }, thunkAPI) => {
    const response = await api.employments.updatePosition(data);
    await thunkAPI.dispatch(fetchGetCvEmployments({ idCv }));
    return response;
});

export const fetchDeleteCleanAllEmployment = createAsyncThunk('countrus/fetchDeleteCleanAllEmployment', async ({ idCv }, thunkAPI) => {
    const response = await api.employments.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetCvEmployments({ idCv }));
    return response;
});

export const fetchUpdateEmployment = createAsyncThunk('employment/fetchUpdateEmployment', async ({ index }, thunkAPI) => {
    const { employment: { employmentObj } } = thunkAPI.getState();
    let { id, ...obj } = employmentObj[index];

    const response = await api.employments.updateEmploymentItem(id, updateF(obj));
    return response;
});


