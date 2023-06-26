import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import {
    getCoverLetterById,
    getCoverGenerateDate,
    getCoverDataShare,
    updateCoverLetterById,
    updateIsErrorEmail,
    getCoverTextNoAuthNew
} from "../../controllers/cover/personalize";

import { statusLoaded, statusLoader } from '../../constants/statuses';
import { cleanStartPersonFields } from "../../constants/formPerson";

const initialState = {
    coverDataObj: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        zipCode: "",
        state: "",
        questionGraduateFromCollege: "",
        graduateDate: "",
        questionCurrentlyInCollegeUniversity: "",
        expectedYearOfGraduation: "",
        nameCollegeOrUniversity: "",
        pointAverage: "",
        fieldOfStudyOrDegree: "",
        professionalSkills: "",
        skillSet: "",
        wordDescribes: "",
        othersDescribe: "",
        questionHaveWorkExperience: "",
        industryHoldExperienceJobTitle: "",
        industryHoldExperienceCompanyName: "",
        workExperience: "",
        workExperienceYears: "",
        questionCurrentlyWorking: "",
        currentRoleJobTitle: "",
        currentRoleCompanyName: "",
        recentRoleJobTitle: "",
        recentRoleCompanyName: "",
        explainAnyWorkGaps: "",
        applyingCompanyName: "",
        applyingCompanyJobTitle: "",
        applyingCompanyTitle: "",
        applyingCompanyContact: "",
        lastPosition: "undefined",
    },
    coverGenerateDate: null,
    from: null,
    to: null,
    coverDataObjNew: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        zipCode: "",
        state: "",
        questionGraduateFromCollege: "",
        graduateDate: "",
        questionCurrentlyInCollegeUniversity: "",
        expectedYearOfGraduation: "",
        nameCollegeOrUniversity: "",
        pointAverage: "",
        fieldOfStudyOrDegree: "",
        professionalSkills: "",
        skillSet: "",
        wordDescribes: "",
        othersDescribe: "",
        questionHaveWorkExperience: "",
        industryHoldExperienceJobTitle: "",
        industryHoldExperienceCompanyName: "",
        workExperience: "",
        workExperienceYears: "",
        questionCurrentlyWorking: "",
        currentRoleJobTitle: "",
        currentRoleCompanyName: "",
        recentRoleJobTitle: "",
        recentRoleCompanyName: "",
        explainAnyWorkGaps: "",
        applyingCompanyName: "",
        applyingCompanyJobTitle: "",
        applyingCompanyTitle: "",
        applyingCompanyContact: "",
    },
    drawing: true,
    emailRegister: '',
    isErrorEmail: false,
    status: statusLoaded,
    statusNew: statusLoaded,
    statusCoverGenerate: statusLoaded,
};

export const slice = createSlice({
    name: 'coverDataForm',
    initialState,
    reducers: {
        cleanNewForm(state, action) {
            state.coverDataObjNew = initialState.coverDataObjNew;
        },
        cleanFormPersonalizeNew(state, action) {
            state.coverDataObjNew = { ...state.coverDataObjNew, ...cleanStartPersonFields };
        },
        handleUpdateDrawingFalse(state, action) {
            state.drawing = false;
        },
        handleUpdateDrawingTrue(state, action) {
            state.drawing = true;
        },
        updateItemField(state, action) {
            let { name, value } = action.payload;
            state.coverDataObj[name] = value;
            state.coverDataObjNew[name] = value;
        },
        updateFieldEmailForRegister(state, action) {
            state.emailRegister = action.payload;
        },
        cleanFormPersonalize(state, action) {
            state.coverDataObj = { ...state.coverDataObj, ...cleanStartPersonFields };
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            if (action.payload.coverDataForm.coverGenerateDate?.length > 0) {
                state.coverGenerateDate = action.payload.coverDataForm.coverGenerateDate;
                state.from = action.payload.coverDataForm.from;
                state.to = action.payload.coverDataForm.to;
            }

            state.coverDataObj = action.payload.coverDataForm.coverDataObj;
        },
        // getCoverDataShare show
        [getCoverDataShare.pending]: (state) => {
            state.status = statusLoader;
        },
        [getCoverDataShare.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.coverDataObj = action?.payload.data || initialState.coverDataObj;
            state.coverGenerateDate = action?.payload?.cover_letter || null;
            state.to = action.payload?.to || null
            state.from = action.payload?.from || null;
        },
        // get
        [getCoverLetterById.pending]: (state) => {
            state.status = statusLoader;
        },
        [getCoverLetterById.fulfilled]: (state, action) => {
            state.coverDataObj = action.payload?.data || initialState.coverDataObj;
            state.coverGenerateDate = action.payload?.cover_letter || null;
            state.from = action.payload?.from || null;
            state.to = action.payload?.to || null;
            state.status = statusLoaded;
            state.drawing = true;
        },
        // get covet text no auth
        [getCoverTextNoAuthNew.pending]: (state) => {
            state.status = statusLoader;
        },
        [getCoverTextNoAuthNew.fulfilled]: (state, action) => {
            state.coverGenerateDate = action.payload.cover_letter;
            state.to = action.payload?.to || null
            state.from = action.payload?.from || null;
            state.drawing = true;
            state.status = statusLoaded;
        },
        // get cover ketter generate
        [getCoverGenerateDate.pending]: (state) => {
            state.status = statusLoader;
        },
        [getCoverGenerateDate.fulfilled]: (state, action) => {
            state.coverGenerateDate = action.payload.cover_letter;
            state.to = action.payload?.to || null
            state.from = action.payload?.from || null;
            state.drawing = true;
            state.status = statusLoaded;
        },
        [updateCoverLetterById.pending]: (state) => {
            state.status = statusLoader;
        },
        [updateCoverLetterById.fulfilled]: (state, action) => {
            state.status = statusLoaded;
        },
        [updateIsErrorEmail.fulfilled]: (state, action) => {
            state.isErrorEmail = action.payload.status;
        },
    }
});

export const {
    updateItemField,
    updateFieldEmailForRegister,
    cleanFormPersonalize,
    cleanFormPersonalizeNew,
    cleanCoverNewForm,
    handleUpdateDrawingFalse,
    handleUpdateDrawingTrue,
    cleanNewForm
} = slice.actions;

export const { reducer } = slice;