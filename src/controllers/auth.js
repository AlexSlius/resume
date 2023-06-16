import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { cookieDestroy, cookieSet } from '../helpers/nookies';

import { routersPages } from '../constants/next-routers';
import { setIsAuth, setLogout, updateFieldsModalAuth } from '../slices/auth';
import { fetchUserGetAvatar, fetchUserGetProfile, getUserDataSettings } from "../controllers/users";
import { contactSetNew } from "../controllers/contacts";
import { coverSetNew } from "../controllers/cover/personalize";
import { localStorageRemove, sessionStorageRemove } from '../helpers/localStorage';
import { addItemNotification } from "../slices/notifications";


export const logout = async (dispatch) => {
    await cookieDestroy({ key: 'token' });
    await localStorageRemove('session_id');
    await sessionStorageRemove("typeResume");
    await dispatch(setLogout());
    await Router.push('/');
}

export const autoRegisterForm = createAsyncThunk('fetch/fetchAutoRegisterForm', async ({ data, setState, setIsPassword }, thunkAPI) => {
    setState(prev => ({ ...prev, load: true }));
    const response = await api.auth.autorizeSendCodeByEmail({ ...data });

    if (response?.token?.length > 0) {
        Router.push(`/${routersPages['dashboard']}`);
        cookieSet({ key: 'token', data: response.token });
        await thunkAPI.dispatch(fetchUserGetAvatar());
        await thunkAPI.dispatch(fetchUserGetProfile());
        await thunkAPI.dispatch(getUserDataSettings());
        return {};
    }

    if (!response?.token?.length > 0) {
        setState({
            load: false, text: `A user with this email already exists. ${response?.status || ""}`
        });
        setIsPassword(true);
        return {};
    }

    setState(prev => ({ ...prev, load: false }));
    return {};
});

export const loginFormCode = createAsyncThunk('fetch/loginFormCode', async ({ data, setState }, thunkAPI) => {
    setState(prev => ({ ...prev, load: true }));

    const response = await api.auth.autorizeAuth({ ...data });

    if (response?.token?.length > 0) {
        Router.push(`/${routersPages['dashboard']}`);
        cookieSet({ key: 'token', data: response.token });
        setState(prev => ({ ...prev, text: '' }));
        await thunkAPI.dispatch(fetchUserGetAvatar());
        await thunkAPI.dispatch(fetchUserGetProfile());
        await thunkAPI.dispatch(getUserDataSettings());
        return {};
    }

    if (!response?.token?.length > 0) {
        setState(prev => ({ ...prev, text: response?.status || "" }));
        return {};
    }

    setState(prev => ({ ...prev, load: false }));
    return {};
});

export const fetcAutorizeSendCode = createAsyncThunk('fetch/fetcAutorizeSendCode', async ({
    data,
    isResume,
    pictureFile = null,
    linkRedirect = undefined,
    isClickBtn = false
}, thunkAPI) => {
    let resSession = undefined;

    if (isResume) {
        // resume get session_di
        resSession = await thunkAPI.dispatch(contactSetNew({
            isNewResume: true,
            dataImage: pictureFile,
            isRedirect: false,
        }));
    }

    if (!isResume) {
        // cover get session_di
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

        await thunkAPI.dispatch(fetchUserGetAvatar());
        await thunkAPI.dispatch(fetchUserGetProfile());
        await thunkAPI.dispatch(getUserDataSettings());

        return { id: reseAut?.payload.id };
    }

    if (response?.code) {
        // это если существующий пользователь то приходит код 
        // вызывать модалку дла ввода кода
        await thunkAPI.dispatch(updateFieldsModalAuth({
            show: true,
            isClickBtn: isClickBtn,
            linkRedirect: linkRedirect,
            isResume: isResume,
            email: data.email,
            id_session: resSession?.payload?.session_id
        }));

        await thunkAPI.dispatch(fetchUserGetAvatar());
        await thunkAPI.dispatch(fetchUserGetProfile());
        await thunkAPI.dispatch(getUserDataSettings());

        return { id: undefined };
    }

    return {};
})

export const autorizeAuthCode = createAsyncThunk('fetch/autorizeAuthCode', async (_, thunkAPI) => {
    const { auth: { authModalObj: { code, email, isClickBtn, linkRedirect, isResume, id_session } } } = thunkAPI.getState();
    const response = await api.auth.autorizeAuth({ code, email, id_session });

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
        await thunkAPI.dispatch(getUserDataSettings());
        // await thunkAPI.dispatch(addItemNotification({ text: response.status }));
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