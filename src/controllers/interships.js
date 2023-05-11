import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { addNewF, updateF } from '../helpers/dataController';

// all list
export const fetchGetCvInternships = createAsyncThunk('interhip/fetchGetCvInternships', async ({ idCv }, thunkAPI) => {
    const response = await api.internships.getListInternships(idCv);
    return response;
});

export const fetchPostUpdatePositionInternships = createAsyncThunk('countrus/fetchPostUpdatePositionInternships', async ({ idCv, data }, thunkAPI) => {
    const response = await api.internships.updatePosition(data);
    await thunkAPI.dispatch(fetchGetCvInternships({ idCv }));
    return response;
});

export const fetchPostAddCvOneInternships = createAsyncThunk('interhip/fetchPostAddCvOneInternships', async ({ idCv, position }, thunkAPI) => {
    const { interships: { objNew } } = thunkAPI.getState();

    const response = await api.internships.addInternshipsItem(idCv, { ...addNewF(objNew), position });
    await thunkAPI.dispatch(fetchGetCvInternships({ idCv }));
    return response;
});

export const fetchDeleteInternships = createAsyncThunk('interhip/fetchDeleteHobie', async ({ idCv, id }, thunkAPI) => {
    const response = await api.internships.deleteInternshipsItem(id);
    await thunkAPI.dispatch(fetchGetCvInternships({ idCv }));
    return response;
});

export const fetchDeleteAll = createAsyncThunk('interhip/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.internships.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetCvInternships({ idCv }));
    return response;
});

export const fetchUpdateInternships = createAsyncThunk('interhip/fetchUpdateInternships', async ({ index }, thunkAPI) => {
    const { interships: { interhipObj } } = thunkAPI.getState();
    let { id, jobTitle, ...obj } = interhipObj[index];

    obj.job_title = jobTitle;

    const response = await api.internships.updateInternshipsItem(id, updateF(obj, true));
    return response;
});

