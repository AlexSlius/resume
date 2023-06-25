import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { isSuccessNewContact, isRespondServerSuccesss, isError } from '../helpers/checkingStatuses';
import { localStorageSet, sessionStorageSet } from "../helpers/localStorage"
import { routersPages } from '../constants/next-routers';
import { newObjContact } from '../helpers/resumeDestructObj';
import { addItemNotification } from "../slices/notifications";
import { handleCVUpdateDrawingTrue } from "../slices/resumeData";
import { setUpdateResumeActive } from './resumeData';

export const contactAddNew = createAsyncThunk('fetch/setNewContact', async ({ pictureFile, isNewResume, isDashboard = false, isRedirect = true }, thunkAPI) => {
    const { contacts: { contactObj, contactObjNew }, menuAsideResume, resumeData: { resumeActiveNew }, users: { objFormSettings, avatar: { image } } } = thunkAPI.getState();

    const dataAccout = {
        email: objFormSettings?.email || '',
        first_name: objFormSettings?.firstName || '',
        last_name: objFormSettings?.lastName || ''
    };

    const newObj = newObjContact(isNewResume ? { ...contactObjNew, ...dataAccout } : contactObj, isDashboard ? (image || null) : pictureFile);
    const response = await api.contact.setAddResume(newObj);

    if (isRedirect) {
        if (isRespondServerSuccesss(response)) {
            thunkAPI.dispatch(setUpdateResumeActive({ idCv: response.id, data: { cv_template_id: resumeActiveNew.id } }));

            if (isDashboard) {
                await Router.push(`/${routersPages['resumeBuilder']}/${response.id}${menuAsideResume.list[0].link}`);
            } else {
                await Router.push(`/${routersPages['resumeBuilder']}/${response.id}${menuAsideResume.list[1].link}`);
            }
        }
    }

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    }

    return response;
})

export const contactSetNew = createAsyncThunk('fetch/setNewRegisterContact', async ({ dataImage, isNewResume, isRedirect = true }, thunkAPI) => {
    const { contacts: { contactObj, contactObjNew }, menuAsideResume } = thunkAPI.getState();
    const newObj = newObjContact(isNewResume ? contactObjNew : contactObj, dataImage);

    const response = await api.contact.setBaseInfo(newObj);

    if (isRedirect) {
        if (isSuccessNewContact(response)) {
            localStorageSet("session_id", response.session_id);
            localStorageSet("is_page", "resume");

            sessionStorageSet("routet_page_next", `${menuAsideResume.list[1].link}`)
            Router.push(`/${routersPages['register']}`);
        }
    }

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    }

    return response;
})

export const getBasicContact = createAsyncThunk('fetch/getBasicContact', async (idCv, thunkAPI) => {
    const response = await api.contact.getBasic(idCv);
    return response[0];
})

export const fetchUpdateContact = createAsyncThunk('fetch/fetchUpdateContact', async ({ idCv, dataImage }, thunkAPI) => {
    const { contacts: { contactObj } } = thunkAPI.getState()
    const newObj = newObjContact(contactObj, !!dataImage ? dataImage : contactObj.picture);

    const response = await api.contact.updateContact(idCv, newObj);

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
        return response;
    }

    thunkAPI.dispatch(handleCVUpdateDrawingTrue());

    return response;
});

export const updateIsErrorEmail = createAsyncThunk('fetch/updateIsErrorEmail', async (_, thunkAPI) => {
    const { contacts: { emailRegister, contactObjNew } } = thunkAPI.getState()

    if ((emailRegister?.length > 0) && /\S+@\S+\.\S+/.test(emailRegister)) {
        return { status: false, email: emailRegister };
    }

    if ((contactObjNew.email?.length > 0) && /\S+@\S+\.\S+/.test(contactObjNew.email)) {
        return { status: false, email: contactObjNew.email };
    }

    return { status: true }
});