import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { camelToSnake } from '../helpers/caseConverters';
import { cookieParse } from '../helpers/nookies';

export const fetchUserGetAvatar = createAsyncThunk('users/fetchUserGetAvatar', async () => {
    let cookies = cookieParse({ ctx: null });

    if (!!cookies?.token) {
        const response = await api.users.getUserAvatar();
        return response;
    }

    return null;
});

export const fetchUserGetProfile = createAsyncThunk('users/fetchUserGetProfiles', async () => {
    let cookies = cookieParse({ ctx: null });

    if (!!cookies?.token) {
        const response = await api.users.getUserProgile();

        return { user: response };
    }

    return null;
});

export const fetchUserDeleteProfile = createAsyncThunk('users/fetchUserDeleteProfile', async (_, thunkAPI) => {
    const response = await api.users.deleteUserProgile();
    return response;
});

export const fetchUserUpdateServer = createAsyncThunk('users/fetchUserUpdateServer', async (_, thunkAPI) => {
    const { users: { objForm, objFormSettings } } = thunkAPI.getState();

    let newObj = {
        email: objFormSettings.email || "",
        firstName: objFormSettings.firstName || "",
        lastName: objFormSettings.lastName || "",
        updatesAndOffersNotification: objForm.UpdatesAndOffersNotification ? 1 : 0,
        resumeAnalyticsNotification: objForm.ResumeAnalyticsNotification ? 1 : 0,
        resumeAndJobNotification: objForm.ResumeAndJobNotification ? 1 : 0,
    }

    const response = await api.users.updateUserProgile(camelToSnake(newObj));
    return response;
});

export const getUserDataSettings = createAsyncThunk('users/getUserDataSettings', async (_, thunkAPI) => {
    let cookies = cookieParse({ ctx: null });

    if (!!cookies?.token) {
        const response = await api.users.getUserDataSettings();
        return response;
    }

    return null;
});
