import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../../apiSingleton";

// all list
export const fetchGetCoversList = createAsyncThunk('resumes/fetchGetCoversList', async () => {
    const response = await api.covers.getCoversAll();
    return response;
});

// update item name resume
// export const fetchPostUpdateCovers = createAsyncThunk('resumes/fetchPostUpdateResumes', async ({ id, data }, thunkAPI) => {
//     const response = await api.resumes.postUpdateResumaName(id, data);
//     // thunkAPI.dispatch(fetchGetResumesList());
//     return response;
// });

