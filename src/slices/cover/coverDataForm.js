import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// import {
//   contactSetNew,
//   getBasicContact,
//   contactAddNew
// } from "../controllers/contacts";

import {
    getCoverLetterById
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
    status: statusLoaded,
    statusNew: statusLoaded,
};

export const slice = createSlice({
    name: 'coverDataForm',
    initialState,
    reducers: {
        updateItemField(state, action) {
            let { name, value } = action.payload;
            state.coverDataObj[name] = value;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                coverDataObj: {
                    ...state.coverDataObj,
                    ...action.payload.coverDataForm.coverDataObj,
                }
            }
        },
        // get
        [getCoverLetterById.pending]: (state) => {
            state.coverDataObj = initialState.coverDataObj;
            state.status = statusLoader;
        },
        [getCoverLetterById.fulfilled]: (state, action) => {
            state.status = statusLoaded;
            state.coverDataObj = action.payload.data;
        },
    }
});

export const {
    updateItemField
} = slice.actions;

export const { reducer } = slice;
