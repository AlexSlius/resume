import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import {
    getCoverLetterById,
    getCoverGenerateDate,
    getCoverDataShare
} from "../../controllers/cover/personalize";

import { statusLoaded, statusLoader } from '../../constants/statuses';

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
            state.statusCoverGenerate = statusLoader;
        },
        [getCoverGenerateDate.fulfilled]: (state, action) => {
            state.statusCoverGenerate = statusLoaded;
            state.coverGenerateDate = action.payload.cover_letter;
        },
    }
});

export const {
    updateItemField
} = slice.actions;

export const { reducer } = slice;
