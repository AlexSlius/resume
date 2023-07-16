import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { combinedReducers } from './root-reducer';

export const makeStore = () => configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  evdTools: false,
});

export const wrapper = createWrapper(makeStore);
