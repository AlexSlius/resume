import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../../apiSingleton";
import { downloadA } from '../../utils/downloadA';

// all list
export const fetchGetCoversList = createAsyncThunk('resumes/fetchGetCoversList', async () => {
    const response = await api.covers.getCoversAll();
    return response;
});

// update item name resume
export const fetchPostUpdateCover = createAsyncThunk('resumes/fetchPostUpdateCover', async ({ id, data }, thunkAPI) => {
    const response = await api.covers.fetchPostUpdateCover(id, data);
    return response;
});

// postShareResume
export const postShareCover = createAsyncThunk('resumes/postShareCover', async ({ id }, thunkAPI) => {
    const response = await api.covers.postShare(id, { status: "share" });
    return response;
});

export const downloadLetterPdf = createAsyncThunk('resume/getDownloadLetter', async ({ id, shareKey }, thunkAPI) => {
    if (shareKey?.length > 0) {
        downloadA(`share/cover_pdf/${id}/${shareKey}`);
    } else {
        let res = await thunkAPI.dispatch(postShareCover({ id }));

        if (res?.payload?.key?.length > 0)
            await downloadA(`share/cover_pdf/${id}/${res?.payload?.key}`);
    }
});

export const deleteCover = createAsyncThunk('resumes/deleteCover', async ({ id }, thunkAPI) => {
    const response = await api.covers.deleteCover(id);
    await thunkAPI.dispatch(fetchGetCoversList());
    return response;
});

export const lastPositionCover = createAsyncThunk('resumes/lastPositionCover', async ({ id, namePosition }) => {
    const response = await api.covers.lastPosition(id, { position: namePosition });
    return response;
});

export const getScreenCover = createAsyncThunk('resumes/getScreenCover', async ({ id, shareKey = '' }, thunkAPI) => {
    let iskey = (shareKey?.length > 0) && (shareKey != "null");

    if (iskey) {
        const response = await api.covers.screenCover(id, shareKey);
    }

    if (!(iskey)) {
        let res = await thunkAPI.dispatch(postShareCover({ id }));

        if (res.payload?.key?.length > 0) {
            const response = await api.covers.screenCover(id, res.payload?.key);
        }
    }
});
