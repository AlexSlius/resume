import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { cookieDestroy, cookieSet } from '../helpers/nookies';
import { isRespondServerSuccesss } from '../helpers/checkingStatuses';

import { routersPages } from '../constants/next-routers';
import { setLogout } from '../slices/auth';
import {
    sessionStorageGet,
    localStorageRemove
} from '../helpers/localStorage';

export const logout = async (dispatch) => {
    await cookieDestroy({ key: 'token' });
    await localStorageRemove('session_id');
    await dispatch(setLogout());
    await Router.push('/');
}

export const fetchAuthLogin = createAsyncThunk('fetch/authLogin', async (data) => {
    const response = await api.auth.login(data);

    if (response?.token) {
        cookieSet({ key: 'token', data: response.token });
        Router.push(`${routersPages['dashboard']}`);
    }

    return response;
})

export const fetchAuthRegister = createAsyncThunk('fetch/authRegister', async (data, thunkAPI) => {
    const { menuAsideResume } = thunkAPI.getState();
    const response = await api.auth.register(data);

    if (response?.token) {
        cookieSet({ key: 'token', data: response.token });

        let nextRouterPage = sessionStorageGet('routet_page_next');

        if (!!nextRouterPage) {
            Router.push(`/${routersPages['resumeBuilder']}/${response.id}${nextRouterPage}`);
        } else {
            Router.push(`${menuAsideResume?.list[0].link}`);
        }
    } else {
        if (response?.errors == "session_empty") {
            Router.push(`${routersPages['resumeBuilderNew']}`);
        }
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