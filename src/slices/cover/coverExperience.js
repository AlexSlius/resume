import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// import {
//   contactSetNew,
//   getBasicContact,
//   contactAddNew
// } from "../controllers/contacts";
import { statusLoaded, statusLoader } from '../../constants/statuses';

const initialState = {
    experienceObj: {
        questionGraduateFromCollege: "",
        graduateDate: "",
        questionCurrentlyInCollegeUniversity: "",
        expectedYearOfGraduation: "",
        nameCollegeOrUniversity: "",
        pointAverage: "",
        fieldOfStudyOrDegree: "",
        professionalSkills: "Communication,Responsive Web Design,User Interface Design,Dashboard,Prototyping",
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
    name: 'coverExperince',
    initialState,
    reducers: {
        updateItemField(state, action) {
            let { name, value } = action.payload;
            state.experienceObj[name] = value;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                experienceObj: {
                    ...state.experienceObj,
                    ...action.payload.coverPerson.experienceObj,
                }
            }
        },
    }
});

export const {
    updateItemField
} = slice.actions;

export const { reducer } = slice;
