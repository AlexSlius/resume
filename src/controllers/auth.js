import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { cookieDestroy, cookieSet } from '../helpers/nookies';
import { isRespondServerSuccesss } from '../helpers/checkingStatuses';

import { routersPages } from '../constants/next-routers';
import { setIsAuth, setLogout, updateFieldsModalAuth } from '../slices/auth';
import { fetchUserGetAvatar, fetchUserGetProfile } from "../controllers/users";
import { contactSetNew } from "../controllers/contacts";
import { coverSetNew } from "../controllers/cover/personalize";
import {
    sessionStorageGet,
    localStorageRemove,
    sessionStorageRemove,
    localStorageGet
} from '../helpers/localStorage';
import { setUpdateResumeActive } from './resumeData';
import { cleanSliseNew } from "../slices/contact";
import { cleanCoverNewForm } from "../slices/cover/coverDataForm";
import { addItemNotification } from "../slices/notifications";

export const logout = async (dispatch) => {
    await cookieDestroy({ key: 'token' });
    await localStorageRemove('session_id');
    await sessionStorageRemove("typeResume");
    await dispatch(setLogout());
    setTimeout(() => {
        Router.push('/');
    }, 500);
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

        thunkAPI.dispatch(cleanSliseNew());
        thunkAPI.dispatch(cleanCoverNewForm());
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

// automation registr
export const fetcAutorizeSendCode = createAsyncThunk('fetch/fetcAutorizeSendCode', async ({
    data,
    isResume,
    pictureFile = null,
    linkRedirect = undefined,
    isClickBtn = false
}, thunkAPI) => {
    let resSession = undefined;

    if (isResume) {
        // resume
        resSession = await thunkAPI.dispatch(contactSetNew({
            isNewResume: true,
            dataImage: pictureFile,
            isRedirect: false,
        }));
    }

    if (!isResume) {
        // cover
        resSession = await thunkAPI.dispatch(coverSetNew({
            isRedirect: false,
        }));
    }

    if (!resSession?.payload?.session_id)
        return {};

    const response = await api.auth.autorizeSendCodeByEmail({ ...data, session_id: resSession?.payload?.session_id });

    if (response?.token?.length > 0) {
        // если сразу есть токен
        let reseAut = await thunkAPI.dispatch(responseAuthAutorizate({
            isClickBtn,
            linkRedirect,
            isResume,
            response
        }));

        return { id: reseAut?.payload.id };
    }

    if (response?.code) {
        // это если существующий пользователь то приходит код 
        // вызывать модалку дла ввода кода
        thunkAPI.dispatch(updateFieldsModalAuth({
            show: true,
            isClickBtn: isClickBtn,
            linkRedirect: linkRedirect,
            isResume: isResume,
            email: data.email,
        }));

        return { id: undefined };
    }

    return {};
})

export const autorizeAuthCode = createAsyncThunk('fetch/autorizeAuthCode', async (_, thunkAPI) => {
    const { auth: { authModalObj: { code, email, isClickBtn, linkRedirect, isResume } } } = thunkAPI.getState();
    const response = await api.auth.autorizeAuth({ code, email });

    if (response?.status != "autorized") {
        thunkAPI.dispatch(addItemNotification({ text: response.status, type: 'err' }));
        return { status: false };
    }

    if (response?.token?.length > 0) {
        let reseAut = await thunkAPI.dispatch(responseAuthAutorizate({
            isClickBtn,
            linkRedirect,
            isResume,
            response
        }));

        return { id: reseAut?.payload.id, status: true };
    }

    return { status: false };
})

export const responseAuthAutorizate = createAsyncThunk('fetch/responseAuthAutorizate', async ({
    response,
    isClickBtn,
    linkRedirect,
    isResume
}, thunkAPI) => {
    const { menuAsideResume } = thunkAPI.getState();

    // если есть токен то сразу же авторизация
    if (response?.token?.length > 0) {
        await cookieSet({ key: 'token', data: response.token });
        await thunkAPI.dispatch(setIsAuth(true));
        await thunkAPI.dispatch(fetchUserGetAvatar());
        await thunkAPI.dispatch(fetchUserGetProfile());
        await thunkAPI.dispatch(addItemNotification({ text: response.status }));
    }

    // resume
    if (isResume && !!response?.id) {
        Router.push(`/${routersPages['resumeBuilder']}/${response.id}${(linkRedirect?.length > 0) ? linkRedirect : menuAsideResume.list[0].link}`);
    }

    // cover
    if (!isResume && !!response?.id) {
        Router.push(`/${routersPages['coverLetter']}/${response.id}${(linkRedirect?.length > 0) ? linkRedirect : menuAsideResume.coverLetters.list[0].link}`);
    }

    if (!!isClickBtn && !!response?.id) {
        Router.push(`/${routersPages['resumeNow']}`);
    }

    return { id: response?.id };
})