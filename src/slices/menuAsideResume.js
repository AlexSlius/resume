import { createSlice } from '@reduxjs/toolkit';

import { keysIcons } from "../constants/next-routers";

const initialState = {
    list: [
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
            name: 'Social Links',
            status: false,
            audit: true,
            link: '/resume-builder/socials',
            keyIcon: [keysIcons["iconSocial"]],
        },
        {
            name: 'Hobbies',
            status: false,
            audit: true,
            link: '/resume-builder/hobies',
            keyIcon: [keysIcons["iconHobbies"]],
        },
        {
            name: 'Languages',
            status: true,
            link: '/resume-builder/languages',
            keyIcon: [keysIcons["iconLanguages"]],
        },
        {
            key: 'extraCurricular',
            status: false,
            audit: true,
            name: 'Extra-curricular activities',
            link: '/resume-builder/activity',
            keyIcon: [keysIcons["iconActivity"]],
        },
        {
            key: 'courses',
            status: false,
            audit: true,
            name: 'Courses',
            link: '/resume-builder/course',
            keyIcon: [keysIcons["iconCourses"]],
        },
        {
            key: 'internship',
            status: false,
            audit: true,
            name: 'Internship',
            link: '/resume-builder/intership',
            keyIcon: [keysIcons["iconInternship"]],
        },
        {
            key: 'reference',
            status: false,
            audit: true,
            name: 'References',
            link: '/resume-builder/reference',
            keyIcon: [keysIcons["iconReferences"]],
        },
        {
            key: 'certificates',
            status: false,
            audit: true,
            name: 'Certifications',
            link: '/resume-builder/certificaties',
            keyIcon: [keysIcons["iconCertifications"]],
        },
        {
            key: 'advanced',
            status: true,
            isEnd: true,
            name: 'Advanced',
            link: '/resume-builder/add_section',
            keyIcon: [keysIcons["iconAdvanced"]],
        }
    ],
};

export const slice = createSlice({
    name: 'menuAsideResume',
    initialState,
    reducers: {
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
} = slice.actions;

export const { reducer } = slice;
