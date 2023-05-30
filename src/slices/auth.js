import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { statusLoaded, statusLoader } from '../constants/statuses';
import {
    fetchAuthLogin,
    fetchAuthRegister,
    fetchAuthResetPassword,
    fetchAuthCodeResetPassword,
    fetchAuthNewPassword
} from '../controllers/auth';

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
    }
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
        // login
        [fetchAuthLogin.pending]: (state) => {
            state.login.status = statusLoader;
        },
        [fetchAuthLogin.fulfilled]: (state, action) => {
            state.login.status = statusLoaded;
        },
        // register
        [fetchAuthRegister.pending]: (state) => {
            state.register.status = statusLoader;
        },
        [fetchAuthRegister.fulfilled]: (state, action) => {
            state.register.textError = action?.payload?.errors || "";
            state.register.status = statusLoaded;
        },
        // reset password
        [fetchAuthResetPassword.pending]: (state) => {
            state.resetPassword.status = statusLoader;
        },
        [fetchAuthResetPassword.fulfilled]: (state, action) => {
            state.resetPassword.status = statusLoaded;
        },
        // code reset password
        [fetchAuthCodeResetPassword.pending]: (state) => {
            state.checkEmailCode.status = statusLoader;
        },
        [fetchAuthCodeResetPassword.fulfilled]: (state, action) => {
            state.checkEmailCode.status = statusLoaded;
        },
        // new password
        [fetchAuthNewPassword.pending]: (state) => {
            state.newPassword.status = statusLoader;
        },
        [fetchAuthNewPassword.fulfilled]: (state, action) => {
            state.newPassword.status = statusLoaded;
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