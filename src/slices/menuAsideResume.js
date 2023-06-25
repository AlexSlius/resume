import { createSlice } from '@reduxjs/toolkit';

import { keysIcons } from "../constants/next-routers";

let startDates = [
    {
        key: 'contact',
        name: 'Contact',
        status: true,
        link: '?tab=contact',
        keyIcon: [keysIcons["iconContact"]],
    },
    {
        key: 'employment',
        name: 'Employment',
        status: true,
        link: '?tab=employment',
        keyIcon: [keysIcons["iconEmploymen"]],
    },
    {
        key: 'education',
        name: 'Education',
        status: true,
        link: '?tab=education',
        keyIcon: [keysIcons["iconEducation"]],
    },
    {
        key: 'skills',
        name: 'Skills',
        status: true,
        link: '?tab=skills',
        keyIcon: [keysIcons["iconSkills"]],
    },
    {
        key: 'languages',
        name: 'Languages',
        status: true,
        link: '?tab=languages',
        keyIcon: [keysIcons["iconLanguages"]],
    },
    {
        key: 'careerObjective',
        name: 'Summary',
        status: true,
        link: '?tab=career-objective',
        keyIcon: [keysIcons["сareerObjective"]],
    },
];

let adds = [
    {
        key: 'socialLinks',
        name: 'Social Links',
        status: true,
        audit: true,
        link: '?tab=socials',
        keyIcon: [keysIcons["iconSocial"]],
    },
    {
        key: 'hobbies',
        name: 'Hobbies',
        status: true,
        audit: true,
        link: '?tab=hobies',
        keyIcon: [keysIcons["iconHobbies"]],
    },
    {
        key: 'extraCurricular',
        status: true,
        audit: true,
        name: 'Extra-curricular activities',
        link: '?tab=activity',
        keyIcon: [keysIcons["iconActivity"]],
    },
    {
        key: 'courses',
        status: true,
        audit: true,
        name: 'Courses',
        link: '?tab=course',
        keyIcon: [keysIcons["iconCourses"]],
    },
    {
        key: 'internship',
        status: true,
        audit: true,
        name: 'Internship',
        link: '?tab=intership',
        keyIcon: [keysIcons["iconInternship"]],
    },
    {
        key: 'reference',
        status: true,
        audit: true,
        name: 'References',
        link: '?tab=reference',
        keyIcon: [keysIcons["iconReferences"]],
    },
    {
        key: 'certificates',
        status: true,
        audit: true,
        name: 'Certifications',
        link: '?tab=certificaties',
        keyIcon: [keysIcons["iconCertifications"]],
    },
];

let startDatesCoverLetters = [
    {
        key: 'personalize',
        name: 'Personalize',
        status: true,
        link: '?tab=contact',
        keyIcon: [keysIcons["iconContact"]],
    },
    {
        key: 'experience',
        name: 'Experience',
        status: true,
        link: '?tab=experience',
        keyIcon: [keysIcons["iconEmploymen"]],
    },
    {
        key: 'download',
        name: 'Download',
        status: true,
        link: '/templates',
        keyIcon: [keysIcons["iconDownload"]],
    },
];

const initialState = {
    list: [...startDates],
    listAdd: [...adds],
    listStart: [...startDates],
    coverLetters: {
        list: [...startDatesCoverLetters],
    }
};

export const slice = createSlice({
    name: 'menuAsideResume',
    initialState,
    reducers: {
        addAllSection(state, action) {
            state.list = action.payload;
        },
        addItemSection(state, action) {
            let { value } = action.payload;
            state.list = [...state.list, ...[value]];
        },
        updateItemStatus(state, action) {
            let { index, value } = action.payload;
            state.list[index]['status'] = value;
        },
        cleanSlise(state, action) {
            state.list = initialState.list;
        }
    }
});

export const {
    updateItemStatus,
    cleanSlise,
    addItemSection,
    addAllSection
} = slice.actions;

export const { reducer } = slice;
