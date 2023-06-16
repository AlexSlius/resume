import { createAsyncThunk } from '@reduxjs/toolkit';

import api from "../../apiSingleton";
import { addItemNotification } from "../../slices/notifications";
import { isRespondServerSuccesss } from '../../helpers/checkingStatuses';

export const sendFormContactUs = createAsyncThunk('pageContact/sendFormContactUs', async ({ data, setState = () => { } }, thunkAPI) => {
    setState(true);

    const response = await api.pages.sendContactUs(data);

    if (isRespondServerSuccesss(response)) {
        // thunkAPI.dispatch(addItemNotification({ text: "Message sent" }));
        setState(false);

        return true;
    }

    thunkAPI.dispatch(addItemNotification({ text: response.status, type: 'err' }));
    return false;
});

