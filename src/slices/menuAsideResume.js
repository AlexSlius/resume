import { createSlice } from '@reduxjs/toolkit';

import { keysIcons } from "../constants/next-routers";

let startDates = [
    {
        name: 'Contact',
        status: true,
        link: '/resume-builder',
        keyIcon: [keysIcons["iconContact"]],
    },
    {
        name: 'Employment',
        status: true,
        link: '/resume-builder/employment',
        keyIcon: [keysIcons["iconEmploymen"]],
    },
    {
        name: 'Education',
        status: true,
        link: '/resume-builder/education',
        keyIcon: [keysIcons["iconEducation"]],
    },
    {
        name: 'Skills',
        status: true,
        link: '/resume-builder/skills',
        keyIcon: [keysIcons["iconSkills"]],
    },
    {
        name: 'Skills',
        status: true,
        link: '/resume-builder/skills',
        keyIcon: [keysIcons["iconSkills"]],
    },
    {
        name: 'Career Objective',
        status: true,
        link: '/resume-builder/career-objective',
        keyIcon: [keysIcons["сareerObjective"]],
    },
];

let adds = [
    {
        key: 'socialLinks',
        name: 'Social Links',
        status: true,
        audit: true,
        link: '/resume-builder/socials',
        keyIcon: [keysIcons["iconSocial"]],
    },
    {
        key: 'hobbies',
        name: 'Hobbies',
        status: true,
        audit: true,
        link: '/resume-builder/hobies',
        keyIcon: [keysIcons["iconHobbies"]],
    },
    {
        key: 'extraCurricular',
        status: true,
        audit: true,
        name: 'Extra-curricular activities',
        link: '/resume-builder/activity',
        keyIcon: [keysIcons["iconActivity"]],
    },
    {
        key: 'courses',
        status: true,
        audit: true,
        name: 'Courses',
        link: '/resume-builder/course',
        keyIcon: [keysIcons["iconCourses"]],
    },
    {
        key: 'internship',
        status: true,
        audit: true,
        name: 'Internship',
        link: '/resume-builder/intership',
        keyIcon: [keysIcons["iconInternship"]],
    },
    {
        key: 'reference',
        status: true,
        audit: true,
        name: 'References',
        link: '/resume-builder/reference',
        keyIcon: [keysIcons["iconReferences"]],
    },
    {
        key: 'certificates',
        status: true,
        audit: true,
        name: 'Certifications',
        link: '/resume-builder/certificaties',
        keyIcon: [keysIcons["iconCertifications"]],
    },
]

const initialState = {
    list: [...startDates],
    listAdd: [...adds],
    listStart: [...startDates]
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
