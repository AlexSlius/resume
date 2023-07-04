import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";
import { downloadA } from '../utils/downloadA';

// all list
export const fetchGetResumesList = createAsyncThunk('resumes/fetchGetResumesList', async () => {
    const response = await api.resumes.getResumesAll();
    return response;
});

// update item name resume
export const fetchPostUpdateResumes = createAsyncThunk('resumes/fetchPostUpdateResumes', async ({ id, data }, thunkAPI) => {
    const response = await api.resumes.postUpdateResumaName(id, data);
    // thunkAPI.dispatch(fetchGetResumesList());
    return response;
});

export const postShareResume = createAsyncThunk('resumes/postShareResume', async ({ id }, thunkAPI) => {
    const response = await api.resumes.postShare(id, { status: "share" });
    return response;
});

export const downloadPdf = createAsyncThunk('resume/getDownloadResume', async ({ id, shareKey, setStatesetStateLoadDown = () => { } }, thunkAPI) => {
    if (shareKey?.length > 0) {
        downloadA(`share/cv_pdf/${id}/${shareKey}`, true, setStatesetStateLoadDown);
    } else {
        let res = await thunkAPI.dispatch(postShareResume({ id }));

        if (res?.payload?.key?.length > 0)
            downloadA(`share/cv_pdf/${id}/${res?.payload?.key}`, true, setStatesetStateLoadDown);

        if (!res?.payload?.key?.length > 0)
            setStatesetStateLoadDown(false);
    }

    return {};
});

export const deleteResume = createAsyncThunk('resumes/deleteResume', async ({ id }, thunkAPI) => {
    const response = await api.resumes.deleteResume(id);
    await thunkAPI.dispatch(fetchGetResumesList());
    return response;
});

export const getScreenResume = createAsyncThunk('resumes/getScreenResume', async ({ id, shareKey = '' }, thunkAPI) => {
    if (shareKey?.length > 0) {
        const response = await api.resumes.screenResume(id, shareKey);
    }

    if (!(shareKey?.length > 0)) {
        let res = await thunkAPI.dispatch(postShareResume({ id }));

        if (res.payload?.key?.length > 0) {
            const response = await api.resumes.screenResume(id, res.payload?.key);
        }
    }
});

