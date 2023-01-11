import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import { statusLoaded, statusLoader, statusError } from '../constants/statuses';

import api from "../apiSingleton";
import { cookieSet } from '../helpers/nookies';
import { isRespondServerSuccesss } from '../helpers/checkingStatuses';

import { routersPages, routerLinksAsideMenu } from '../constants/next-routers';

export const fetchAuthLogin = createAsyncThunk('fetch/authLogin', async (data) => {
    const response = await api.auth.login(data);

    if (response?.token) {
        cookieSet({ key: 'token', data: response.token });
        Router.push(`${routerLinksAsideMenu[0].link}`);
    }

    return response;
})

export const fetchAuthRegister = createAsyncThunk('fetch/authRegister', async (data) => {
    const response = await api.auth.register(data);

    if (response?.token) {
        cookieSet({ key: 'token', data: response.token });
        Router.push(`${routerLinksAsideMenu[0].link}`);
    }

    return response;
})

export const fetchAuthResetPassword = createAsyncThunk('fetch/AuthResetPassword', async (data) => {
    const response = await api.auth.resetPassword(data);
    const isStatus = isRespondServerSuccesss(response);

    if (isStatus)
        Router.push(`/${routersPages['checEmail']}`);

    return response;
})

export const fetchAuthCodeResetPassword = createAsyncThunk('fetch/AuthCodeResetPassword', async (data) => {
    const response = await api.auth.changeCodePassword(data);
    const isStatus = isRespondServerSuccesss(response);

    if (isStatus)
        Router.push(`/${routersPages['newPassword']}`);

    return response;
})

export const fetchAuthNewPassword = createAsyncThunk('fetch/authNewPasswor', async (data) => {
    const response = await api.auth.newPassword(data);

    if (isStatus)
        Router.push(`/${routersPages['login']}`);

    return response;
})

const initialState = {
    login: {
        status: statusLoaded,
    },
    register: {
        status: statusLoaded,
    },
    resetPassword: {
        status: statusLoaded,
    },
    checkEmailCode: {
        status: statusLoaded,
    },
    newPassword: {
        status: statusLoaded,
    },
};

const sliceAuth = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        // login
        [fetchAuthLogin.pending]: (state) => {
            state.login.status = statusLoader;
        },
        [fetchAuthLogin.fulfilled]: (state, action) => {
            state.login.status = statusLoaded;
        },
        // register
        [fetchAuthRegister.pending]: (state) => {
            state.register.status = statusLoader;
        },
        [fetchAuthRegister.fulfilled]: (state, action) => {
            state.register.status = statusLoaded;
        },
        // reset password
        [fetchAuthResetPassword.pending]: (state) => {
            state.resetPassword.status = statusLoader;
        },
        [fetchAuthResetPassword.fulfilled]: (state, action) => {
            state.resetPassword.status = statusLoaded;
        },
        // code reset password
        [fetchAuthCodeResetPassword.pending]: (state) => {
            state.checkEmailCode.status = statusLoader;
        },
        [fetchAuthCodeResetPassword.fulfilled]: (state, action) => {
            state.checkEmailCode.status = statusLoaded;
        },
        // new password
        [fetchAuthNewPassword.pending]: (state) => {
            state.newPassword.status = statusLoader;
        },
        [fetchAuthNewPassword.fulfilled]: (state, action) => {
            state.newPassword.status = statusLoaded;
        },
    },
});

export const { reducer } = sliceAuth;