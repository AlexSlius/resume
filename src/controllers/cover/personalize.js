import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../../apiSingleton";
import { isSuccessNewContact, isRespondServerSuccesss, isError } from '../../helpers/checkingStatuses';
import { localStorageSet, sessionStorageSet, sessionStorageRemove } from "../../helpers/localStorage"
import { routersPages } from '../../constants/next-routers';
import { addItemNotification } from "../../slices/notifications";
// import { setUpdateResumeActive } from '../resumeData';
import { camelToSnake } from '../../helpers/caseConverters';

export const coverAddNew = createAsyncThunk('fetch/coverAddNew', async (_, thunkAPI) => {
    const { coverPerson: { personObj }, menuAsideResume: { coverLetters } } = thunkAPI.getState();

    const newObj = camelToSnake(personObj);
    const response = await api.personalize.addCover(newObj);

    if (isRespondServerSuccesss(response)) {
        // thunkAPI.dispatch(setUpdateResumeActive({ idCv: response.id, data: { cv_template_id: resumeActiveNew.id } }));
        await Router.push(`/${routersPages['coverLetter']}/${response.id}${coverLetters.list[1].link}`);
    }

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    }

    return {};
})

export const coverSetNew = createAsyncThunk('fetch/coverSetNew', async ({ isNewCover = false }, thunkAPI) => {
    const { coverPerson: { personObj }, menuAsideResume: { coverLetters } } = thunkAPI.getState();

    const newObj = camelToSnake(personObj);
    const response = await api.personalize.createNewCoverBasic(newObj);

    if (isSuccessNewContact(response)) {
        localStorageSet("session_id", response.session_id);
        localStorageSet("is_page", "cover");

        sessionStorageSet("routet_page_next", `${coverLetters.list[1].link}`)
        Router.push(`/${routersPages['register']}`);
    }

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    }

    return {};
})

// export const getBasicContact = createAsyncThunk('fetch/getBasicContact', async (idCv, thunkAPI) => {
//     const response = await api.contact.getBasic(idCv);
//     return response[0];
// })

// export const fetchUpdateContact = createAsyncThunk('fetch/fetchUpdateContact', async ({ idCv, dataImage }, thunkAPI) => {
//     const { contacts: { contactObj } } = thunkAPI.getState()
//     const newObj = newObjContact(contactObj, !!dataImage ? dataImage : contactObj.picture);

//     const response = await api.contact.updateContact(idCv, newObj);

//     if (isError(response)) {
//         await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
//     }

//     return response;
// });
