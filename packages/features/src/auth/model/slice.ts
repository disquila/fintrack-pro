import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User } from '@fintrack-pro/entities/user';

export interface AuthState {
  /** Текущий пользователь (null = не авторизован) */
  user: User | null;
  /** Флаг: завершена ли начальная проверка авторизации (onAuthStateChanged)? */
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isInitialized = true;
    },
    clearUser: state => {
      state.user = null;
      state.isInitialized = true;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthInitialized = (state: { auth: AuthState }) => state.auth.isInitialized;
