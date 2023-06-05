import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";
import moment from 'moment';

import api from "../../apiSingleton";
import { isSuccessNewContact, isError } from '../../helpers/checkingStatuses';
import { localStorageSet, sessionStorageSet } from "../../helpers/localStorage"
import { routersPages } from '../../constants/next-routers';
import { addItemNotification } from "../../slices/notifications";
// import { setUpdateResumeActive } from '../resumeData';
import { camelToSnake } from '../../helpers/caseConverters';
import { doNotTransmitEmptyData } from '../../utils/emptyData';
import { cleanStartPersonFields } from "../../constants/formPerson";


export const coverAddNew = createAsyncThunk('fetch/coverAddNew', async ({ isDashboard = false }, thunkAPI) => {
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
        if (isDashboard) {
            await Router.push(`/${routersPages['coverLetter']}/${response.id}${coverLetters.list[0].link}`);
        } else {
            await Router.push(`/${routersPages['coverLetter']}/${response.id}${coverLetters.list[1].link}`);
        }
    }

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    }

    return {};
});

export const coverSetNew = createAsyncThunk('fetch/coverSetNew', async ({ isRedirect = true }, thunkAPI) => {
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

    if (isRedirect) {
        if (isSuccessNewContact(response)) {
            localStorageSet("session_id", response.session_id);
            localStorageSet("is_page", "cover");

            sessionStorageSet("routet_page_next", `${coverLetters.list[1].link}`)
            Router.push(`/${routersPages['register']}`);
        }

        if (isError(response)) {
            await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
        }
    }

    return response;
});

export const getCoverLetterById = createAsyncThunk('fetch/getCoverLetterById', async (idCv, thunkAPI) => {
    const response = await api.personalize.getCoverLetterById(idCv);
    return response;
});

export const getCoverGenerateDate = createAsyncThunk('fetch/getCoverGenerateDate', async (idCv, thunkAPI) => {
    const response = await api.personalize.getCoverLetterById(idCv);
    return response || null;
});

export const updateCoverLetterById = createAsyncThunk('fetch/updateCoverLetterById', async ({ idCv, isClean = false }, thunkAPI) => {
    const { coverDataForm: { coverDataObj } } = thunkAPI.getState();

    // const newObj = camelToSnake({ ...coverDataObj, ...(isClean ? cleanStartPersonFields : {}) });

    // функция doNotTransmitEmptyData не возвращает пустые поля
    const newObj = camelToSnake({ ...doNotTransmitEmptyData(coverDataObj), ...(isClean ? cleanStartPersonFields : {}) });

    newObj.graduate_date = newObj?.graduate_date ? moment(new Date(newObj.graduate_date)) : "";
    newObj.expected_year_of_graduation = newObj?.expected_year_of_graduation ? moment(new Date(newObj.expected_year_of_graduation)) : "";

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


export const updateIsErrorEmail = createAsyncThunk('fetch/updateIsErrorEmailCover', async (_, thunkAPI) => {
    const { coverDataForm: { emailRegister, coverDataObjNew } } = thunkAPI.getState()

    if ((emailRegister?.length > 0) && /\S+@\S+\.\S+/.test(emailRegister)) {
        return { status: false, email: emailRegister };
    }

    if ((coverDataObjNew.email?.length > 0) && /\S+@\S+\.\S+/.test(coverDataObjNew.email)) {
        return { status: false, email: coverDataObjNew.email };
    }

    return { status: true }
});