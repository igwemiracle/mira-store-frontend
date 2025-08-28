import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUsers, RegisterUsers } from '../../services/authService';

export const loginThunk = createAsyncThunk('auth/login', async (credentials) => {
  const res = await LoginUsers(credentials); // returns token and user
  return res.data;
});

export const registerThunk = createAsyncThunk('auth/register', async (data) => {
  const res = await RegisterUsers(data);
  return res.data;
});

export const fetchCurrentUserThunk = createAsyncThunk('auth/fetchCurrentUser', async () => {
  const res = await getCurrentUser();
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
