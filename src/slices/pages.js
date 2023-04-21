import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';
import {
    fetchGetUsersCreatedHome,
} from '../controllers/pages/pagesHome';

const initialState = {
    home: {
        usersCreated: {
            users: null,
            count: null
        }
    },
    status: statusLoaded,
};

export const slice = createSlice({
    name: 'pages',
    initialState,
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                home: action.payload.pages.home,
            }
        },
        // fetchGetUsersCreatedHome
        [fetchGetUsersCreatedHome.pending]: (state) => {
            state.status = statusLoader;
        },
        [fetchGetUsersCreatedHome.fulfilled]: (state, action) => {
            state.home.usersCreated = action.payload;
            state.status = statusLoaded;
        },
    }
});

export const { reducer } = slice;
