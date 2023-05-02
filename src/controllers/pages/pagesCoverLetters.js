import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../../apiSingleton";


export const fetchGetUsersCreatedCoverLetter = createAsyncThunk('pagesCoverLetter/fetchGetUsersCreated', async () => {
    const response = await api.pages.ApifetchGetUsersCreatedCoverLetter();
    return response;
});

export const getAllPageCoverLetter = createAsyncThunk('pagesCoverLetter/getAllPageCoverLetter', async (_, thunkAPI) => {
    await thunkAPI.dispatch(fetchGetUsersCreatedCoverLetter());
    return {};
});