import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';
import {
    fetchGetUsersCreatedHome,
} from '../controllers/pages/pagesHome';

import {
    fetchGetUsersCreatedCoverLetter
} from '../controllers/pages/pagesCoverLetters';

const initialState = {
    home: {
        usersCreated: {
            users: null,
            count: null
        },
    },
    coverLetter: {
        usersCreated: {
            users: null,
            count: null
        },
    },
    status: statusLoaded,
};

export const slice = createSlice({
    name: 'pages',
    initialState,
    extraReducers: {
        // fetchGetUsersCreatedHome
        [fetchGetUsersCreatedHome.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchGetUsersCreatedHome.fulfilled]: (state, action) => {
            state.home.usersCreated = action.payload;
            state.status = statusLoaded;
        },
        // fetchGetUsersCreatedCoverLetter
        [fetchGetUsersCreatedCoverLetter.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchGetUsersCreatedCoverLetter.fulfilled]: (state, action) => {
            state.coverLetter.usersCreated = action.payload;
            state.status = statusLoaded;
        },
    }
});

export const { reducer } = slice;
