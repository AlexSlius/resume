import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

export const fetchGetCountrys = createAsyncThunk('countrus/fetchGetCountrus', async () => {
    const response = await api.dependencies.getCountrys();
    return response;
})

export const fetchGetCities = createAsyncThunk('sities/fetchGetCities', async (id) => {
    const response = await api.dependencies.getCities(id);
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
    const response = await api.dependencies.getNationality({ "query": nationality?.name || '' });
    return response;
})

export const getJopsTitle = createAsyncThunk('fetch/fetchGetJopsTitle', async (_, thunkAPI) => {
    const { employment: { employmentObj } } = thunkAPI.getState();
    const response = await api.dependencies.getJopsTitle({ "query": employmentObj.title || '' });
    return response;
})

export const getCompanyList = createAsyncThunk('fetch/fetchGetCompanyList', async (_, thunkAPI) => {
    const { employment: { employmentObj } } = thunkAPI.getState();
    const response = await api.dependencies.getCompanys({ "query": employmentObj.company || '' });
    return response;
})



