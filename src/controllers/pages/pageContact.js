import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../../apiSingleton";
import { addItemNotification } from "../../slices/notifications";

export const sendFormContactUs = createAsyncThunk('pageContact/sendFormContactUs', async ({ data, setState = () => { } }, thunkAPI) => {
    setState(true);

    // const response = await api.pages.sendContactUs(data);

    // if() {
    //     thunkAPI.dispatch(addItemNotification({ text: "Message sent" }));
    //     setState(false);
    // }

    // thunkAPI.dispatch(addItemNotification({ text: response.status, type: 'err' }));

    return true;
});

