import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

export const fetchDeleteAll = createAsyncThunk('careers/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.careers.cleanAll(idCv);
    // await thunkAPI.dispatch(fetchGetSkillslistAll({ idCv }));
    return response;
});