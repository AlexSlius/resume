import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

export const getUniversity = createAsyncThunk('fetch/getUniversity', async (params) => {
    const response = await api.dependencies.getUniversity({ "query": params || '', limit: 40 });
    return response;
});

export const getDegree = createAsyncThunk('fetch/getDegree', async (params) => {
    const response = await api.dependencies.getDegree({ "query": params || '', limit: 40 });
    return response;
});

export const getDescribes = createAsyncThunk('fetch/getDescribes', async (params) => {
    const response = await api.dependencies.getDescribes({ "query": params || '', limit: 40 });
    return response;
});

export const getUniversityByName = createAsyncThunk('fetch/getUniversityByName', async (params) => {
    const response = await api.dependencies.getUniversityByName({ "query": params || '', limit: 10 });
    return response;
});

export const getSkillsStartOneJobTitle = createAsyncThunk('countrus/getSkillsStartOneJobTitle', async ({ data }) => {
    const response = await api.dependencies.getSkillsStartOneJobTitle(data);
    return response;
});

export const fetchGetSkillslistSearchRandom = createAsyncThunk('countrus/fetchGetSkillslistSearchRandom', async (params) => {
    const response = await api.dependencies.getSkillslistSearchRandom({ "query": params || '', limit: 10 });
    return response;
});

export const fetchGetCountrys = createAsyncThunk('countrus/fetchGetCountrus', async () => {
    const response = await api.dependencies.getCountrys();
    return response;
})

export const fetchGetCities = createAsyncThunk('sities/fetchGetCities', async ({ id, params }) => {
    const response = await api.dependencies.getCities(id, { query: params, limit: `100` });
    return response;
})

export const fetchGetFieldOfStudy = createAsyncThunk('fetch/getFieldOfStudy', async (params, thunkAPI) => {
    const response = await api.dependencies.getFieldOfStudy({ "query": params || '' });
    return response;
})

export const fetchGetZipCodes = createAsyncThunk('zip/fetchGetCodes', async (id) => {
    const response = await api.dependencies.getZipCodes(id);
    return response;
})

export const fetchGetDrivers = createAsyncThunk('reivers/fetchGetDrivers', async (id) => {
    const response = await api.dependencies.getDrivers(id);
    return response;
})

export const fetchGetNationality = createAsyncThunk('fetch/fetchGetNationality', async (_, thunkAPI) => {
    const { contacts: { contactObj: { nationality } } } = thunkAPI.getState();
    const response = await api.dependencies.getNationality({ "query": nationality || '' });
    return response;
})

export const getJopsTitle = createAsyncThunk('fetch/fetchGetJopsTitle', async (params, thunkAPI) => {
    const response = await api.dependencies.getJopsTitle({ "query": params || '' });
    return response;
})

export const addJopsTitle = createAsyncThunk('fetch/addJopsTitle', async (name, thunkAPI) => {
    const response = await api.dependencies.addJopsTitle({ name });
    return response;
})

export const getCompanyList = createAsyncThunk('fetch/fetchGetCompanyList', async (params, thunkAPI) => {
    const response = await api.dependencies.getCompanys({ "query": params || '' });
    return response;
})

export const addCompany = createAsyncThunk('fetch/addCompany', async (name, thunkAPI) => {
    const response = await api.dependencies.addCompany({ name });
    return response;
})

export const getEmploymentsList = createAsyncThunk('fetch/fetchGetEmploymentList', async ({ params }, thunkAPI) => {
    const response = await api.dependencies.getEmploymentList({ ...params });

    return response;
})

export const getStudysList = createAsyncThunk('fetch/fetchGetStudysList', async (params, thunkAPI) => {
    const response = await api.dependencies.getStudysList({ "query": params || '' });
    return response;
})

export const fetchGetSkillsList = createAsyncThunk('countrus/fetchGetSkillsList', async (params) => {
    const response = await api.dependencies.getSkillsList({ ...params });
    return response;
})

export const fetchGetSocials = createAsyncThunk('fetch/fetchGetSocials', async (params) => {
    const response = await api.dependencies.getSocials(params ? { "query": params || '' } : {});
    return response;
})

export const fetchGetHobies = createAsyncThunk('fetch/fetchGetHobies', async (params) => {
    const response = await api.dependencies.getHobies(params ? { "query": params || '' } : {});
    return response;
})

export const fetchGetListObjective = createAsyncThunk('fetch/fetchGetListObjective', async (value) => {
    const response = await api.dependencies.getListObjective({ query: value, limit: `40` });
    return response;
})

export const fetchGetListObjectiveById = createAsyncThunk('fetch/fetchGetListObjective', async (id) => {
    const response = await api.dependencies.getListObjectiveById(id);
    return response;
})

export const fetchGetListLanguages = createAsyncThunk('fetch/fetchGetListLanguages', async (value) => {
    let params = {
        limit: `40`
    };

    if (!!value) {
        params.query = value;
    }

    const response = await api.dependencies.getLanguages(params);
    return response;
})

export const fetchGetListCertificates = createAsyncThunk('fetch/fetchGetListCertificates', async (value) => {
    const response = await api.dependencies.getCertificates({ ...(value ? { query: value } : {}), limit: `40` });
    return response;
})

