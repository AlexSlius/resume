import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { isSuccessNewContact, isRespondServerSuccesss, isError } from '../helpers/checkingStatuses';
import { localStorageSet, sessionStorageSet, sessionStorageRemove } from "../helpers/localStorage"
import { routersPages } from '../constants/next-routers';
import { newObjContact } from '../helpers/resumeDestructObj';
import { addItemNotification } from "../slices/notifications";
import { setUpdateResumeActive } from './resumeData';

export const contactAddNew = createAsyncThunk('fetch/setNewContact', async ({ pictureFile, typeResume }, thunkAPI) => {
    const { contacts: { contactObj }, menuAsideResume } = thunkAPI.getState()
    const newObj = newObjContact(contactObj, pictureFile)

    const response = await api.contact.setAddResume(newObj);

    if (isRespondServerSuccesss(response)) {
        thunkAPI.dispatch(setUpdateResumeActive({ idCv: response.id, data: { cv_template_id: typeResume } }));
        await Router.push(`/${routersPages['resumeBuilder']}/${response.id}${menuAsideResume.list[1].link}`);
    }

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    }

    return response;
})

export const contactSetNew = createAsyncThunk('fetch/setNewRegisterContact', async ({ dataImage, typeResume }, thunkAPI) => {
    const { contacts: { contactObj }, menuAsideResume } = thunkAPI.getState()
    const newObj = newObjContact(contactObj, dataImage)

    const response = await api.contact.setBaseInfo(newObj);

    if (isSuccessNewContact(response)) {
        localStorageSet("session_id", response.session_id);

        if (typeResume !== null) {
            sessionStorageSet("typeResume", typeResume);
        } else {
            sessionStorageRemove("typeResume");
        }

        sessionStorageSet("routet_page_next", `${menuAsideResume.list[1].link}`)
        Router.push(`/${routersPages['register']}`);
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
    }

    return response;
});
