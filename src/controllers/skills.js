import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

export const fetchGetSkillslistWork = createAsyncThunk('countrus/fetchGetSkillslistWork', async (params) => {
    const response = await api.skills.getSkillslistWork({ "query": params || '', limit: 10 });
    return response;
});

export const fetchGetSkillslistSearch = createAsyncThunk('countrus/fetchGetSkillslistSearch', async (params) => {
    const response = await api.skills.getSkillslistSearch({ "query": params || '', limit: 10 });
    return response;
});
