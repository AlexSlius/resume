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
import { getScreenResume } from './resumes';
import { cleanSliseNew } from "../slices/contact";
import { fetchUserGetAvatar } from './users';

export const contactAddNew = createAsyncThunk('fetch/setNewContact', async ({
    pictureFile,
    isNewResume,
    isDashboard = false,
    isRedirect = true,
    link = undefined,
    isPage = false,
    isClean = true,
    isGetTemplate = true
}, thunkAPI) => {
    const { contacts:
        {
            contactObj,
            contactObjNew
        },
        menuAsideResume,
        resumeData,
        users: {
            objFormSettings,
            avatar
        }
    } = thunkAPI.getState();

    const dataAccout = {
        email: objFormSettings?.email || contactObjNew.email,
        first_name: objFormSettings?.firstName || contactObjNew.firstName,
        last_name: objFormSettings?.lastName || contactObjNew.lastName
    };

    const picture = isPage ? contactObjNew?.picture?.includes('data:image/') ? pictureFile : avatar?.image_name : pictureFile;
    const newObj = newObjContact(isNewResume ? { ...contactObjNew, ...dataAccout } : contactObj, isDashboard ? (avatar?.image_name || null) : picture);
    const response = await api.contact.setAddResume(newObj);

    if (isRedirect) {
        if (isRespondServerSuccesss(response)) {
            await thunkAPI.dispatch(setUpdateResumeActive({ idCv: response.id, data: { cv_template_id: resumeData.resumeActiveNew.id, template_class: resumeData.resumeActiveNew.template_class, template_line_spacing: resumeData.resumeActiveNew.template_line_spacing, template_text_size: resumeData.resumeActiveNew.template_text_size }, isGet: isGetTemplate }));
            await thunkAPI.dispatch(getScreenResume({ id: response.id }));

            if (isDashboard) {
                await Router.push(`/${routersPages['resumeBuilder']}/${response.id}${menuAsideResume.list[0].link}`);
            } else {
                await Router.push(`/${routersPages['resumeBuilder']}/${response.id}${link ? link : menuAsideResume.list[1].link}`);
            }

            if (isClean) {
                thunkAPI.dispatch(cleanSliseNew());
            }
        }
    }

    if (isError(response)) {
        thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
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
        thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    }

    return response;
})

export const getBasicContact = createAsyncThunk('fetch/getBasicContact', async (idCv, thunkAPI) => {
    const response = await api.contact.getBasic(idCv);
    return response[0];
})

export const fetchUpdateContact = createAsyncThunk('fetch/fetchUpdateContact', async ({ idCv, dataImage }, thunkAPI) => {
    const { contacts: { contactObj } } = thunkAPI.getState();

    if (idCv != 'new') {
        const newObj = newObjContact(contactObj, !!dataImage ? dataImage : contactObj.picture, true);

        const response = await api.contact.updateContact(idCv, newObj);

        if (isError(response)) {
            thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
            return response;
        }

        thunkAPI.dispatch(handleCVUpdateDrawingTrue());
        thunkAPI.dispatch(fetchUserGetAvatar());

        return response;
    }

    return {};
});

export const updateIsErrorEmail = createAsyncThunk('fetch/updateIsErrorEmail', async (_, thunkAPI) => {
    const { contacts: { emailRegister, contactObjNew } } = thunkAPI.getState()

    if ((emailRegister?.length > 0) && /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(emailRegister)) {
        return { status: false, email: emailRegister };
    }

    if ((contactObjNew.email?.length > 0) && /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(contactObjNew.email)) {
        return { status: false, email: contactObjNew.email };
    }

    return { status: true }
});