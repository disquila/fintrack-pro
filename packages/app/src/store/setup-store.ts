import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@fintrack-pro/features/auth';

export const setupStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },

    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
