import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../../apiSingleton";


export const fetchGetUsersCreatedHome = createAsyncThunk('pagesHome/fetchGetUsersCreated', async () => {
    const response = await api.pages.ApiFetchGetUsersCreatedHome();
    return response;
});

export const getAllPageHome = createAsyncThunk('pagesHome/getAllPageHome', async (_, thunkAPI) => {
    await thunkAPI.dispatch(fetchGetUsersCreatedHome());
    return {};
});