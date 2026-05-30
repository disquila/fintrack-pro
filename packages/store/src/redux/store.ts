import { configureStore } from '@reduxjs/toolkit';
import { type StorageService } from '@fintrack-pro/core';
import { createAuthSlice } from './slices/auth.slice';

export const createStore = (storage: StorageService) => {
  const authSlice = createAuthSlice(storage);

  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
  });

  return {
    store,
    authActions: authSlice.actions,
    authThunks: authSlice.thunks,
  };
};
