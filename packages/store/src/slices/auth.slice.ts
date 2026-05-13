import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authApi } from '@fintrack/api';
import type { IAuthState, ILoginCredentials, IRegisterCredentials } from '@fintrack/core';

const initialState: IAuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials: ILoginCredentials) => {
  const response = await authApi.login(credentials);
  return response;
});

export const register = createAsyncThunk('auth/register', async (credentials: IRegisterCredentials) => {
  const response = await authApi.register(credentials);
  return response;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authApi.logout();
  localStorage.removeItem('token');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Register
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Logout
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
