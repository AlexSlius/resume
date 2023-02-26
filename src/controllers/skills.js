import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { isUpdate } from '../helpers/checkingStatuses';

export const fetchGetSkillslistWork = createAsyncThunk('countrus/fetchGetSkillslistWork', async (params) => {
    const response = await api.skills.getSkillslistWork({ "query": params || '', limit: 10 });
    return response;
});

export const fetchGetSkillslistSearch = createAsyncThunk('countrus/fetchGetSkillslistSearch', async (params) => {
    const response = await api.skills.getSkillslistSearch({ "query": params || '', limit: 10 });
    return response;
});

export const fetchGetSkillslistAll = createAsyncThunk('countrus/fetchGetSkillslistAll', async (id) => {
    const response = await api.skills.getSkillslistAll(id);
    return response;
});

export const fetchPostAddSkillone = createAsyncThunk('countrus/fetchPostAddSkillone', async ({ idCv, data }, thunkAPI) => {
    const response = await api.skills.addItemSkillOne(idCv, data);
    await thunkAPI.dispatch(fetchGetSkillslistAll(idCv));
    return response;
});

export const fetchPostUpdateSkillone = createAsyncThunk('countrus/fetchPostUpdateSkillone', async ({ idCv, id, data }, thunkAPI) => {
    const response = await api.skills.updateItemSkillOne(id, data);
    await thunkAPI.dispatch(fetchGetSkillslistAll(idCv));
    return response;
});

export const fetchPostUpdatePositionSkills = createAsyncThunk('countrus/fetchPostUpdatePositionSkills', async ({ idCv, data }, thunkAPI) => {
    const response = await api.skills.updatePosition(data);
    await thunkAPI.dispatch(fetchGetSkillslistAll(idCv));
    return response;
});

export const getSkillsPositionStartOne = createAsyncThunk('countrus/getSkillsPositionStartOne', async ({ data }) => {
    const response = await api.skills.getSkillsPositionStartOne(data);
    return response;
});

export const fetchPostDeleteSkillOne = createAsyncThunk('countrus/fetchPostDeleteSkillOne', async ({ idCv, id }, thunkAPI) => {
    const response = await api.skills.deleteItemSkillOne(id);
    await thunkAPI.dispatch(fetchGetSkillslistAll(idCv));
    return response;
});

export const fetchGetExperienceLevel = createAsyncThunk('countrus/fetchGetExperienceLevel', async ({ idCv }, thunkAPI) => {
    const response = await api.skills.getExperienceLevel(idCv);
    return response;
});

export const fetchDeleteAll = createAsyncThunk('skills/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.skills.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetSkillslistAll({ idCv }));
    return response;
});

export const fetchUpdateExperienceLevel = createAsyncThunk('countrus/fetchUpdateExperienceLevel', async ({ idCv, data }, thunkAPI) => {
    const response = await api.skills.updateExperienceLevel(idCv, { hide_experience_level: data });

    if (isUpdate(response)) {
        thunkAPI.dispatch(fetchGetExperienceLevel({ idCv }));
    }
    return response;
});