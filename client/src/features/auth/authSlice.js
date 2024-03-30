// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api'; // Assuming this is your Axios instance

// Async thunk for signing up
export const signUp = createAsyncThunk('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/signup', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for signing in
export const signIn = createAsyncThunk('auth/signIn', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for signing out
export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Reducer to clear state, useful for sign out
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle sign-in
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = 'succeeded';
    });
    // Handle sign-up
    // Assuming sign-up does not automatically log the user in
    builder.addCase(signUp.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    // Handle sign-out
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'succeeded';
    });
    // Handle loading and errors for all
    builder.addMatcher(
      (action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'),
      (state) => {
        state.status = 'loading';
      }
    ).addMatcher(
      (action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
      (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      }
    );
  },
});

export const { clearAuthState } = authSlice.actions;

export default authSlice.reducer;

