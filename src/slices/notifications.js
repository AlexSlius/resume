import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

export const slice = createSlice({
    name: 'notificationData',
    initialState,
    reducers: {
        addItemNotification(state, action) {
            const { type, text } = action.payload;

            let newObj = {
                type: type || 'succe', // war , err
                text
            }

            state.list.push(newObj);
        },
        removeItemNotification(state, action) {
            state.list.splice(action.payload, 1);
        },
        removeItemShift(state) {
            state.list.shift();
        }
    }
});

export const {
    addItemNotification,
    removeItemNotification,
    removeItemShift
} = slice.actions;

export const { reducer } = slice;
