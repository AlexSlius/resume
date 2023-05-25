import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import {
    getCoverLetterById,
    getCoverGenerateDate,
    getCoverDataShare,
    updateCoverLetterById
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
        updateItemField(state, action) {
            let { name, value } = action.payload;
            state.coverDataObj[name] = value;
            state.coverDataObjNew[name] = value;
        },
        cleanCoverNewForm(state, action) {
            state.coverDataObjNew = initialState.coverDataObjNew;
        },
        updateFieldEmailForRegister(state, action) {
            state.emailRegister = action.payload;
        },
        updateIsErrorEmail(state, action) {
            if ((state.emailRegister?.length > 0) && /\S+@\S+\.\S+/.test(state.emailRegister) || (state.coverDataObjNew.email?.length > 0) && /\S+@\S+\.\S+/.test(state.coverDataObjNew.email)) {
                state.isErrorEmail = false;

            } else {
                state.isErrorEmail = true;
            }
        },
        cleanFormPersonalize(state, action) {
            state.coverDataObj = { ...state.coverDataObj, ...cleanStartPersonFields };
        },
        cleanFormPersonalizeNew(state, action) {
            state.coverDataObjNew = { ...state.coverDataObjNew, ...cleanStartPersonFields };
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                coverGenerateDate: action.payload.coverDataForm.coverGenerateDate,
                coverDataObj: {
                    ...state.coverDataObj,
                    ...action.payload.coverDataForm.coverDataObj,
                },
            }
        },
        // getCoverDataShare show
        [getCoverDataShare.pending]: (state) => {
            state.coverDataObj = initialState.coverDataObj;
            state.coverGenerateDate = initialState.coverGenerateDate;
            state.status = statusLoader;
        },
        [getCoverDataShare.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.coverDataObj = action.payload.data;
            state.coverGenerateDate = action.payload.cover_letter;
        },
        // get
        [getCoverLetterById.pending]: (state) => {
            state.coverDataObj = initialState.coverDataObj;
            state.coverGenerateDate = initialState.coverGenerateDate;
            state.status = statusLoader;
        },
        [getCoverLetterById.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.coverDataObj = action.payload.data;
            state.coverGenerateDate = action.payload.cover_letter;
        },
        // get cover ketter generate
        [getCoverGenerateDate.pending]: (state) => {
            state.status = statusLoader;
            state.statusCoverGenerate = statusLoader;
        },
        [getCoverGenerateDate.fulfilled]: (state, action) => {
            state.statusCoverGenerate = statusLoaded;
            state.status = statusLoaded;
            state.coverGenerateDate = action.payload.cover_letter;
        },
        [updateCoverLetterById.pending]: (state) => {
            state.status = statusLoader;
        },
        [updateCoverLetterById.fulfilled]: (state, action) => {
            state.status = statusLoaded;
        },
    }
});

export const {
    updateItemField,
    updateFieldEmailForRegister,
    updateIsErrorEmail,
    cleanFormPersonalize,
    cleanFormPersonalizeNew
} = slice.actions;

export const { reducer } = slice;
