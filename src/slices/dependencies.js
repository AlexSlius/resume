import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../apiSingleton";
import { statusLoaded, statusLoader, statusError } from '../constants/statuses';

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

const initialState = {
    coutrys: {
        list: [],
        status: statusLoaded
    },
    cities: {
        list: [],
        status: statusLoaded,
    },
    zipsCodes: {
        list: [],
        status: statusLoaded,
    },
    drivers: {
        list: [],
        status: statusLoaded,
    },
    nationality: {
        list: [],
        status: statusLoaded,
    }
};

export const sliceDepenndecies = createSlice({
    name: 'dependencies',
    initialState,
    reducers: {},
    extraReducers: {
        //get all coutrys
        [fetchGetCountrys.pending]: (state) => {
            state.coutrys.list = [];
            state.coutrys.status = statusLoader;
        },
        [fetchGetCountrys.fulfilled]: (state, action) => {
            state.coutrys.status = statusLoaded;
            state.coutrys.list = action.payload;
        },
        [fetchGetCountrys.rejected]: (state) => {
            state.coutrys.list = [];
            state.coutrys.status = statusError;
        },
        //end get all coutrys

        //get all cities
        [fetchGetCities.pending]: (state) => {
            state.cities.list = [];
            state.cities.status = statusLoader;
        },
        [fetchGetCities.fulfilled]: (state, action) => {
            state.cities.status = statusLoaded;
            state.cities.list = action.payload;
        },
        [fetchGetCities.rejected]: (state) => {
            state.cities.list = [];
            state.cities.status = statusError;
        },
        //end get all cities

        //get all zipsCodes
        [fetchGetZipCodes.pending]: (state) => {
            state.zipsCodes.list = [];
            state.zipsCodes.status = statusLoader;
        },
        [fetchGetZipCodes.fulfilled]: (state, action) => {
            state.zipsCodes.status = statusLoaded;
            state.zipsCodes.list = action.payload;
        },
        [fetchGetZipCodes.rejected]: (state) => {
            state.zipsCodes.list = [];
            state.zipsCodes.status = statusError;
        },
        //end get all zipsCodes

        //get all drivers
        [fetchGetDrivers.pending]: (state) => {
            state.drivers.list = [];
            state.drivers.status = statusLoader;
        },
        [fetchGetDrivers.fulfilled]: (state, action) => {
            state.drivers.status = statusLoaded;
            state.drivers.list = action.payload;
        },
        [fetchGetDrivers.rejected]: (state) => {
            state.drivers.list = [];
            state.drivers.status = statusError;
        },
        //end get all drivers

        //get all nationality
        [fetchGetNationality.pending]: (state) => {
            state.nationality.list = [];
            state.nationality.status = statusLoader;
        },
        [fetchGetNationality.fulfilled]: (state, action) => {
            state.nationality.status = statusLoaded;
            state.nationality.list = action.payload;
        },
        [fetchGetNationality.rejected]: (state) => {
            state.nationality.list = [];
            state.nationality.status = statusError;
        },
        //end get all nationality
    }
});

export const { reducer } = sliceDepenndecies;
