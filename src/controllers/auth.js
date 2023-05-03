import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { cookieDestroy, cookieSet } from '../helpers/nookies';
import { isRespondServerSuccesss } from '../helpers/checkingStatuses';

import { routersPages } from '../constants/next-routers';
import { setLogout } from '../slices/auth';
import {
    sessionStorageGet,
    localStorageRemove,
    sessionStorageRemove,
    localStorageGet
} from '../helpers/localStorage';
import { setUpdateResumeActive } from './resumeData';

export const logout = async (dispatch) => {
    await cookieDestroy({ key: 'token' });
    await localStorageRemove('session_id');
    await sessionStorageRemove("typeResume");
    await dispatch(setLogout());
    setTimeout(() => {
        Router.push('/');
    }, 0);
}

export const fetchAuthLogin = createAsyncThunk('fetch/authLogin', async (data) => {
    sessionStorageRemove("typeResume");

    const response = await api.auth.login(data);

    if (response?.token) {
        cookieSet({ key: 'token', data: response.token });
        Router.push(`${routersPages['dashboard']}`);
    }

    return response;
})

// typeResume пока не использую
export const fetchAuthRegister = createAsyncThunk('fetch/authRegister', async ({ data, typeResume }, thunkAPI) => {
    const { menuAsideResume, resumeData: { resumeActiveNew } } = thunkAPI.getState();
    const response = await api.auth.register(data);

    if (response?.token) {
        cookieSet({ key: 'token', data: response.token });

        let nextRouterPage = sessionStorageGet('routet_page_next');
        let isPages = localStorageGet("is_page");

        if (isPages == "resume") {
            if (!!resumeActiveNew.id) {
                thunkAPI.dispatch(setUpdateResumeActive({ idCv: response.id, data: { cv_template_id: resumeActiveNew.id }, isRemoveSesion: true }));
            }
        } else if (isPages == "cover") {
            // шаблон для cover 
        }

        if (!!nextRouterPage) {
            Router.push(`/${routersPages[(isPages == "cover") ? 'coverLetter' : 'resumeBuilder']}/${response.id}${nextRouterPage}`);
        } else {
            Router.push(`/${routersPages['dashboard']}`);
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