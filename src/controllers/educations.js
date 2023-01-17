import { createAsyncThunk } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

import api from "../apiSingleton";

// all list
export const fetchGetCvEducations = createAsyncThunk('education/fetchGetCvEducations', async ({ idCv, isPage = false }, thunkAPI) => {
    const response = await api.educations.getListEducation(idCv);

    if (isPage) {
        if (isArray(response) && response?.length == 0)
            await thunkAPI.dispatch(fetchPostAddCvOneEducation({ idCv }));
    }

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
    let editDate = { ...educationObj[index] };

    // здесь нужно будет проверить форматы дат, не сохраняется 
    editDate.period_from = editDate.dateFrom.date;
    editDate.period_to = editDate.dateTo.date;

    const response = await api.educations.updateEducationItem(editDate.id, editDate);
    return response;
});

