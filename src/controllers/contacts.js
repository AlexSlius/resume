import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../apiSingleton";
import { isSuccessNewContact, isRespondServerSuccesss } from '../helpers/checkingStatuses';
import { localStorageSet, sessionStorageSet } from "../helpers/localStorage"
import { routersPages, routerLinksAsideMenu } from '../constants/next-routers';
import { newObjContact } from '../helpers/resumeDestructObj';

export const contactAddNew = createAsyncThunk('fetch/setNewContact', async (dataImage, thunkAPI) => {
    const { contacts: { contactObj } } = thunkAPI.getState()
    const newObj = newObjContact(contactObj, dataImage)

    const response = await api.contact.setAddResume(newObj);

    if (isRespondServerSuccesss(response)) {
        await localStorageSet("idCv", response.id);
        await Router.push(routerLinksAsideMenu[1].link);
    }

    return response;
})

export const contactSetNew = createAsyncThunk('fetch/setNewContact', async (dataImage, thunkAPI) => {
    const { contacts: { contactObj } } = thunkAPI.getState()
    const newObj = newObjContact(contactObj, dataImage)

    const response = await api.contact.setBaseInfo(newObj);

    if (isSuccessNewContact(response)) {
        localStorageSet("session_id", response.session_id);
        sessionStorageSet("routet_page_next", `${routerLinksAsideMenu[1].link}`)
        Router.push(`/${routersPages['register']}`);
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
    return response;
});
