import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from "next/router";
import moment from 'moment';

import api from "../../apiSingleton";
import { isSuccessNewContact, isError } from '../../helpers/checkingStatuses';
import { localStorageSet, sessionStorageSet } from "../../helpers/localStorage"
import { returnIsDataField } from "../../helpers/returnFiedlIsDara";
import { routersPages } from '../../constants/next-routers';
import { addItemNotification } from "../../slices/notifications";
import { cleanNewForm } from "../../slices/cover/coverDataForm";
// import { setUpdateResumeActive } from '../resumeData';
import { camelToSnake } from '../../helpers/caseConverters';
import { doNotTransmitEmptyData } from '../../utils/emptyData';
import { cleanStartPersonFields } from "../../constants/formPerson";
import { setUpdateCoverDataActive } from './coverData';


export const coverAddNew = createAsyncThunk('fetch/coverAddNew', async ({
    isDashboard = false,
    isAddNewAuth = false,
    isRedirect = true,
    isClean = true,
    isGetTemplate = true
}, thunkAPI) => {
    const {
        coverDataForm: { coverDataObjNew },
        menuAsideResume: { coverLetters },
        users: { objFormSettings },
        coverData: {
            resumeActiveNew
        }
    } = thunkAPI.getState();

    const dataAccout = {
        email: objFormSettings?.email,
        firstName: objFormSettings?.firstName || '',
        lastName: objFormSettings?.lastName || '',
    };

    // getCoverDataActive
    const newObj = camelToSnake({
        firstName: coverDataObjNew.firstName,
        lastName: coverDataObjNew.lastName,
        country: coverDataObjNew.country,
        city: coverDataObjNew.city,
        state: coverDataObjNew.state,
        zipCode: coverDataObjNew.zipCode,
        email: coverDataObjNew.email,
        phone: coverDataObjNew.phone,
        workExperienceYears: coverDataObjNew.workExperienceYears,
        ...(isDashboard ? dataAccout : {})
    });

    const response = await api.personalize.addCover(returnIsDataField(newObj));

    if (response?.status == "added") {
        if (isDashboard) {
            await thunkAPI.dispatch(setUpdateCoverDataActive({ idCv: response.id, data: { cover_template_id: resumeActiveNew.id, template_class: resumeActiveNew.template_class, template_line_spacing: resumeActiveNew.template_line_spacing, template_text_size: resumeActiveNew.template_text_size } }));
            await Router.push(`/${routersPages['coverLetter']}/${response.id}${coverLetters.list[0].link}`);
        } else {
            if (isAddNewAuth) {
                await thunkAPI.dispatch(setUpdateCoverDataActive({ idCv: response.id, data: { cover_template_id: resumeActiveNew.id, template_class: resumeActiveNew.template_class, template_line_spacing: resumeActiveNew.template_line_spacing, template_text_size: resumeActiveNew.template_text_size }, isGet: isGetTemplate }));
            }

            if (isRedirect)
                await Router.push(`/${routersPages['coverLetter']}/${response.id}${coverLetters.list[1].link}`);
        }

        if (isClean)
            await thunkAPI.dispatch(cleanNewForm());
    }

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    }

    return response;
});

export const coverSetNew = createAsyncThunk('fetch/coverSetNew', async ({ isRedirect = true }, thunkAPI) => {
    const { coverDataForm: { coverDataObjNew }, menuAsideResume: { coverLetters } } = thunkAPI.getState();

    const newObj = camelToSnake({
        firstName: coverDataObjNew.firstName,
        lastName: coverDataObjNew.lastName,
        country: coverDataObjNew.country,
        city: coverDataObjNew.city,
        state: coverDataObjNew.state,
        zipCode: coverDataObjNew.zipCode,
        email: coverDataObjNew.email,
        phone: coverDataObjNew.phone,
        workExperienceYears: coverDataObjNew.workExperienceYears
    });

    const response = await api.personalize.createNewCoverBasic(returnIsDataField(newObj));

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

export const getCoverLetterById = createAsyncThunk('fetch/getCoverLetterById2', async (idCv, thunkAPI) => {
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

    const response = await api.personalize.updateCoverLetterById(idCv, returnIsDataField(newObj));

    if (isError(response)) {
        await thunkAPI.dispatch(addItemNotification({ text: response.message, type: 'err' }));
    } else {
        await thunkAPI.dispatch(getCoverGenerateDate(idCv));
    }

    return response;
});

export const getCoverTextNoAuthNew = createAsyncThunk('fetch/getCoverTextNoAuthNew', async (_, thunkAPI) => {
    const { coverDataForm: { coverDataObjNew } } = thunkAPI.getState();

    // функция doNotTransmitEmptyData не возвращает пустые поля
    const newObj = camelToSnake(doNotTransmitEmptyData(coverDataObjNew));

    newObj.graduate_date = newObj?.graduate_date ? moment(new Date(newObj.graduate_date)) : "";
    newObj.expected_year_of_graduation = newObj?.expected_year_of_graduation ? moment(new Date(newObj.expected_year_of_graduation)) : "";

    const response = await api.personalize.getCoverTextNoAuthNew(newObj);

    return response;
});


export const getCoverDataShare = createAsyncThunk('resumeData/getCoverDataShare', async ({ idCv, key }) => {
    const response = await api.personalize.getCoverDataShare(idCv, key);

    return response;
});

export const updateIsErrorEmail = createAsyncThunk('fetch/updateIsErrorEmailCover', async (_, thunkAPI) => {
    const { coverDataForm: { emailRegister, coverDataObjNew } } = thunkAPI.getState()

    if ((emailRegister?.length > 0) && /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(emailRegister)) {
        return { status: false, email: emailRegister };
    }

    if ((coverDataObjNew.email?.length > 0) && /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(coverDataObjNew.email)) {
        return { status: false, email: coverDataObjNew.email };
    }

    return { status: true }
});


