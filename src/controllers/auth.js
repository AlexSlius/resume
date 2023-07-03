import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { cookieDestroy, cookieSet } from '../helpers/nookies';

import { routersPages } from '../constants/next-routers';
import { setIsAuth, setLogout, updateFieldsModalAuth } from '../slices/auth';
import { cleanNewForm } from "../slices/cover/coverDataForm";
import { fetchUserGetAvatar, fetchUserGetProfile, getUserDataSettings } from "../controllers/users";
import { contactSetNew } from "../controllers/contacts";
import { coverSetNew, getCoverLetterById } from "../controllers/cover/personalize";
import { localStorageRemove, sessionStorageRemove } from '../helpers/localStorage';
import { addItemNotification } from "../slices/notifications";
import { getCoverDataActive, setUpdateCoverDataActive } from './cover/coverData';
import { setUpdateResumeActive, getResumeActive } from "./resumeData";
import { cleanSliseNew } from "../slices/contact";


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
        setState({ load: false, text: response?.status || "" });
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
    isClickBtn = false,
    allFunCalb = () => { },
}, thunkAPI) => {
    let resSession = undefined;
    let {
        coverData: {
            resumeActiveNew,
        },
        resumeData,
    } = thunkAPI.getState();

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

        await allFunCalb();


        if (isResume) {
            // resume
            await thunkAPI.dispatch(setUpdateResumeActive({ idCv: reseAut?.payload.id, data: { cv_template_id: resumeData.resumeActiveNew.id, template_class: resumeData.resumeActiveNew.template_class, template_line_spacing: resumeData.resumeActiveNew.template_line_spacing, template_text_size: resumeData.resumeActiveNew.template_text_size }, isGet: true }));
            await thunkAPI.dispatch(getResumeActive({ idCv: reseAut?.payload.id }));
            thunkAPI.dispatch(cleanSliseNew());
        }

        if (!isResume) {
            // cover letter
            // если регистраиция то создаю шаблон 
            await thunkAPI.dispatch(setUpdateCoverDataActive({ idCv: reseAut?.payload.id, data: { cover_template_id: resumeActiveNew.id, template_class: resumeActiveNew.template_class, template_line_spacing: resumeActiveNew.template_line_spacing, template_text_size: resumeActiveNew.template_text_size }, isGet: true }));
            await thunkAPI.dispatch(getCoverLetterById(reseAut?.payload.id));
            await thunkAPI.dispatch(getCoverDataActive({ idCv: reseAut?.payload.id }));
            thunkAPI.dispatch(cleanNewForm());
        }

        return { id: reseAut?.payload.id };
    }

    if (response?.code) {
        // это если существующий пользователь то приходит код 
        // вызывать модалку дла ввода кода
        await allFunCalb();

        await thunkAPI.dispatch(updateFieldsModalAuth({
            show: true,
            isClickBtn: isClickBtn,
            linkRedirect: linkRedirect,
            isResume: isResume,
            email: data.email,
            id_session: resSession?.payload?.session_id
        }));

        return { id: undefined };
    }

    await allFunCalb();
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
    const {
        menuAsideResume,
        coverData: {
            resumeActiveNew,
        },
        resumeData
    } = thunkAPI.getState();

    // если есть токен то сразу же авторизация
    if (response?.token?.length > 0) {
        await cookieSet({ key: 'token', data: response.token });
        await thunkAPI.dispatch(setIsAuth(true));
        await thunkAPI.dispatch(fetchUserGetAvatar());
        await thunkAPI.dispatch(fetchUserGetProfile());
        await thunkAPI.dispatch(getUserDataSettings());
    }

    // resume
    if (isResume && !!response?.id) {
        await thunkAPI.dispatch(setUpdateResumeActive({ idCv: response.id, data: { cv_template_id: resumeData.resumeActiveNew.id, template_class: resumeData.resumeActiveNew.template_class, template_line_spacing: resumeData.resumeActiveNew.template_line_spacing, template_text_size: resumeData.resumeActiveNew.template_text_size }, isGet: true }));
        await thunkAPI.dispatch(getResumeActive({ idCv: response.id }));
        thunkAPI.dispatch(cleanSliseNew());
        Router.push(`/${routersPages['resumeBuilder']}/${response.id}${(linkRedirect?.length > 0) ? linkRedirect : menuAsideResume.list[0].link}`);
    }

    // cover
    if (!isResume && !!response?.id) {
        await thunkAPI.dispatch(setUpdateCoverDataActive({ idCv: response.id, data: { cover_template_id: resumeActiveNew.id, template_class: resumeActiveNew.template_class, template_line_spacing: resumeActiveNew.template_line_spacing, template_text_size: resumeActiveNew.template_text_size }, isGet: true }));
        await thunkAPI.dispatch(getCoverLetterById(response.id));
        await thunkAPI.dispatch(getCoverDataActive({ idCv: response.id }));
        Router.push(`/${routersPages['coverLetter']}/${response.id}${(linkRedirect?.length > 0) ? linkRedirect : menuAsideResume.coverLetters.list[0].link}`);
    }

    if (!!isClickBtn && !!response?.id) {
        Router.push(`/${routersPages['resumeNow']}`);
    }

    return { id: response?.id };
})