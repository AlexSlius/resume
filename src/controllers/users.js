import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../apiSingleton";

export const fetchUserGetAvatar = createAsyncThunk('users/fetchUserGetAvatar', async () => {
    const response = await api.users.getUserAvatar();
    return response;
});