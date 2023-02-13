import { createAsyncThunk } from '@reduxjs/toolkit';
import { isArray } from 'lodash';

import api from "../apiSingleton";

// all list
export const fetchGetCvCourses = createAsyncThunk('education/fetchGetCvCourses', async ({ idCv }, thunkAPI) => {
    const response = await api.courses.getListCourses(idCv);
    return response;
});

export const fetchPostUpdatePositionCourses = createAsyncThunk('countrus/fetchPostUpdatePositionCourses', async ({ idCv, data }, thunkAPI) => {
    const response = await api.courses.updatePosition(data);
    await thunkAPI.dispatch(fetchGetCvCourses({ idCv }));
    return response;
});

export const fetchPostAddCvOneCourses = createAsyncThunk('education/fetchPostAddCvOneCourses', async ({ idCv, position }, thunkAPI) => {
    const { courses: { objNew } } = thunkAPI.getState();

    const response = await api.courses.addCoursesItem(idCv, { ...objNew, position });
    await thunkAPI.dispatch(fetchGetCvCourses({ idCv }));
    return response;
});

export const fetchDeleteCourses = createAsyncThunk('countrus/fetchDeleteHobie', async ({ idCv, id }, thunkAPI) => {
    const response = await api.courses.deleteCoursesItem(id);
    await thunkAPI.dispatch(fetchGetCvCourses({ idCv }));
    return response;
});

export const fetchDeleteAll = createAsyncThunk('courses/fetchDeleteAll', async ({ idCv }, thunkAPI) => {
    const response = await api.courses.cleanAll(idCv);
    await thunkAPI.dispatch(fetchGetCvCourses({ idCv }));
    return response;
});

export const fetchUpdateCourses = createAsyncThunk('countrus/fetchUpdateCourses', async ({ index }, thunkAPI) => {
    const { courses: { courseObj } } = thunkAPI.getState();
    let { id, dateFrom, dateTo, ...obj } = courseObj[index];

    obj.period_from = dateFrom?.date || "";
    obj.period_to = dateTo?.date || "";

    const response = await api.courses.updateCoursesItem(id, obj);
    return response;
});

