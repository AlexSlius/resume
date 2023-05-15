import { createAsyncThunk } from '@reduxjs/toolkit';
import { striteApiGetPlans } from '../strite/api';

export const striteGetPlans = createAsyncThunk('strite/striteGetPlans', async () => {
    const response = await striteApiGetPlans();
    return response?.data || null;
});

