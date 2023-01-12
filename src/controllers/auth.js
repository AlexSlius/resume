import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { cookieDestroy, cookieSet } from '../helpers/nookies';
import { isRespondServerSuccesss } from '../helpers/checkingStatuses';

import { routersPages, routerLinksAsideMenu } from '../constants/next-routers';
import { setLogout } from '../slices/auth';

export const logout = (dispatch) => {
    cookieDestroy({ key: 'token' });
    dispatch(setLogout());
    Router.push('/');
}

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