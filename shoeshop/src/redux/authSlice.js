import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const login = createAsyncThunk('/login', async ({ username, password }) => {
    const response = await api.post('/login', { username, password });
    return response.data;
});

export const signup = createAsyncThunk('/signup', async ({ username, email, password }) => {
    const response = await api.post('/signup', { username, email, password });
    return response.data;
});


const initialState = {
    isAuthenticated: false,
    user: null,
    status: 'idle',
    error: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.token = action.payload?.token;
                state.user = action.payload?.user;
                localStorage.setItem('token', action.payload?.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                localStorage.setItem('token', null);
            });

        builder
            .addCase(signup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.isAuthenticated = true;
                // state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
