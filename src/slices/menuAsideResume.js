import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [
        {
            name: 'Contact',
            status: true,
            link: '/resume-builder',
        },
        {
            name: 'Employment',
            status: true,
            link: '/resume-builder/employment',
        },
        {
            name: 'Education',
            status: true,
            link: '/resume-builder/education',
        },
        {
            name: 'Skills',
            status: true,
            link: '/resume-builder/skills',
        },
        {
            name: 'Social Links',
            status: true,
            link: '/resume-builder/socials',
        },
        {
            name: 'Hobbies',
            status: true,
            link: '/resume-builder/hobies',
        },
        {
            name: 'Languages',
            status: true,
            link: '/resume-builder/languages',
        },
        {
            key: 'extraCurricular',
            status: false,
            audit: true,
            name: 'Extra-curricular activities',
            link: '/resume-builder/activity',
        },
        {
            key: 'courses',
            status: false,
            audit: true,
            name: 'Courses',
            link: '/resume-builder/course',
        },
        {
            key: 'internship',
            status: false,
            audit: true,
            name: 'Internship',
            link: '/resume-builder/intership',
        },
        {
            key: 'reference',
            status: false,
            audit: true,
            name: 'References',
            link: '/resume-builder/reference',
        },
        {
            key: 'certificates',
            status: false,
            audit: true,
            name: 'Certifications',
            link: '/resume-builder/certificaties',
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
