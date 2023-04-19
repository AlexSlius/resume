import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";

import api from "../../apiSingleton";
import { isSuccessNewContact, isRespondServerSuccesss, isError } from '../../helpers/checkingStatuses';
import { localStorageSet, sessionStorageSet, sessionStorageRemove } from "../../helpers/localStorage"
import { routersPages } from '../../constants/next-routers';
import { addItemNotification } from "../../slices/notifications";
// import { setUpdateResumeActive } from '../resumeData';
import { camelToSnake } from '../../helpers/caseConverters';
import { doNotTransmitEmptyData } from '../../utils/emptyData';

export const coverAddNew = createAsyncThunk('fetch/coverAddNew', async (_, thunkAPI) => {
    const { coverDataForm: { coverDataObj }, menuAsideResume: { coverLetters } } = thunkAPI.getState();

    const newObj = camelToSnake({
        firstName: coverDataObj.firstName,
        lastName: coverDataObj.lastName,
        country: coverDataObj.country,
        city: coverDataObj.city,
        state: coverDataObj.state,
        zipCode: coverDataObj.zipCode,
        email: coverDataObj.email,
        phone: coverDataObj.phone,
    });

    const response = await api.personalize.addCover(newObj);

    if (response?.status == "added") {
        await Router.push(`/${routersPages['coverLetter']}/${response.id}${coverLetters.list[1].link}`);
    }

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    }

    return {};
});

export const coverSetNew = createAsyncThunk('fetch/coverSetNew', async ({ isNewCover = false }, thunkAPI) => {
    const { coverDataForm: { coverDataObj }, menuAsideResume: { coverLetters } } = thunkAPI.getState();

    const newObj = camelToSnake({
        firstName: coverDataObj.firstName,
        lastName: coverDataObj.lastName,
        country: coverDataObj.country,
        city: coverDataObj.city,
        state: coverDataObj.state,
        zipCode: coverDataObj.zipCode,
        email: coverDataObj.email,
        phone: coverDataObj.phone,
    });

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
});

export const getCoverLetterById = createAsyncThunk('fetch/getCoverLetterById', async (idCv, thunkAPI) => {
    const response = await api.personalize.getCoverLetterById(idCv);
    return response;
});

export const getCoverGenerateDate = createAsyncThunk('fetch/getCoverGenerateDate', async (idCv, thunkAPI) => {
    const response = await api.personalize.getCoverLetterById(idCv);
    return response;
});

export const updateCoverLetterById = createAsyncThunk('fetch/updateCoverLetterById', async ({ idCv }, thunkAPI) => {
    const { coverDataForm: { coverDataObj } } = thunkAPI.getState();

    const newObj = camelToSnake(doNotTransmitEmptyData(coverDataObj));

    const response = await api.personalize.updateCoverLetterById(idCv, newObj);

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    } else {
        await thunkAPI.dispatch(getCoverGenerateDate(idCv));
    }

    return response;
});

export const getCoverDataShare = createAsyncThunk('resumeData/getCoverDataShare', async ({ idCv, key }) => {
    const response = await api.personalize.getCoverDataShare(idCv, key);
    return response;
});
