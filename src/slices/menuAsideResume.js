import { createSlice } from '@reduxjs/toolkit';

import { keysIcons } from "../constants/next-routers";

let startDates = [
    {
        key: 'contact',
        name: 'Contact',
        status: true,
        link: '/contact',
        keyIcon: [keysIcons["iconContact"]],
    },
    {
        key: 'employment',
        name: 'Employment',
        status: true,
        link: '/employment',
        keyIcon: [keysIcons["iconEmploymen"]],
    },
    {
        key: 'education',
        name: 'Education',
        status: true,
        link: '/education',
        keyIcon: [keysIcons["iconEducation"]],
    },
    {
        key: 'skills',
        name: 'Skills',
        status: true,
        link: '/skills',
        keyIcon: [keysIcons["iconSkills"]],
    },
    {
        key: 'languages',
        name: 'Languages',
        status: true,
        link: '/languages',
        keyIcon: [keysIcons["iconLanguages"]],
    },
    {
        key: 'careerObjective',
        name: 'Career Objective',
        status: true,
        link: '/career-objective',
        keyIcon: [keysIcons["сareerObjective"]],
    },
];

let adds = [
    {
        key: 'socialLinks',
        name: 'Social Links',
        status: true,
        audit: true,
        link: '/socials',
        keyIcon: [keysIcons["iconSocial"]],
    },
    {
        key: 'hobbies',
        name: 'Hobbies',
        status: true,
        audit: true,
        link: '/hobies',
        keyIcon: [keysIcons["iconHobbies"]],
    },
    {
        key: 'extraCurricular',
        status: true,
        audit: true,
        name: 'Extra-curricular activities',
        link: '/activity',
        keyIcon: [keysIcons["iconActivity"]],
    },
    {
        key: 'courses',
        status: true,
        audit: true,
        name: 'Courses',
        link: '/course',
        keyIcon: [keysIcons["iconCourses"]],
    },
    {
        key: 'internship',
        status: true,
        audit: true,
        name: 'Internship',
        link: '/intership',
        keyIcon: [keysIcons["iconInternship"]],
    },
    {
        key: 'reference',
        status: true,
        audit: true,
        name: 'References',
        link: '/reference',
        keyIcon: [keysIcons["iconReferences"]],
    },
    {
        key: 'certificates',
        status: true,
        audit: true,
        name: 'Certifications',
        link: '/certificaties',
        keyIcon: [keysIcons["iconCertifications"]],
    },
];

let startDatesCoverLetters = [
    {
        key: 'personalize',
        name: 'Personalize',
        status: true,
        link: '/personalize',
        keyIcon: [keysIcons["iconContact"]],
    },
    {
        key: 'experience',
        name: 'Experience',
        status: true,
        link: '/experience',
        keyIcon: [keysIcons["iconEmploymen"]],
    },
    {
        key: 'download',
        name: 'Download',
        status: true,
        link: '/download',
        keyIcon: [keysIcons["iconEducation"]],
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
