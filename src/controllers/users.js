import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { camelToSnake } from '../helpers/caseConverters';

export const fetchUserGetAvatar = createAsyncThunk('users/fetchUserGetAvatar', async () => {
    const response = await api.users.getUserAvatar();
    return response;
});

export const fetchUserGetProfile = createAsyncThunk('users/fetchUserGetProfile', async () => {
    const response = await api.users.getUserProgile();
    return response;
});

export const fetchUserDeleteProfile = createAsyncThunk('users/fetchUserDeleteProfile', async (_, thunkAPI) => {
    const response = await api.users.deleteUserProgile();
    return response;
});

export const fetchUserUpdateServer = createAsyncThunk('users/fetchUserUpdateServer', async (_, thunkAPI) => {
    const { users: { objForm } } = thunkAPI.getState();
    const response = await api.users.updateUserProgile(camelToSnake(objForm));
    return response;
});
