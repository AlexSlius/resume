import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded } from '../constants/statuses';

const initialState = {
    autorizate: {
        isAthorized: false,
    },
    login: {
        status: statusLoaded,
    },
    register: {
        textError: '',
        status: statusLoaded,
    },
    resetPassword: {
        status: statusLoaded,
    },
    checkEmailCode: {
        status: statusLoaded,
    },
    newPassword: {
        status: statusLoaded,
    },
    authModalObj: {
        code: '',
        show: false,
        isClickBtn: false,
        linkRedirect: '',
        isResume: true,
        email: '',
        id_session: '',
    },
    settingsUser: {}
};

const sliceAuth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth(state, action) {
            state.autorizate.isAthorized = action.payload;
        },
        setLogout(state, action) {
            state.autorizate.isAthorized = false;
        },
        cleanError(state, action) {
            state[action.payload]['textError'] = '';
        },
        updateFieldsModalAuth(state, action) {
            state.authModalObj = { ...state.authModalObj, ...action.payload }
        },
        cleanFieldsModalAuth(state, action) {
            state.authModalObj = initialState.authModalObj;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                autorizate: {
                    ...state.autorizate,
                    ...action.payload.auth.autorizate
                }
            }
        },
    },
});

export const {
    setIsAuth,
    setLogout,
    cleanError,
    updateFieldsModalAuth,
    cleanFieldsModalAuth
} = sliceAuth.actions;

export const { reducer } = sliceAuth;