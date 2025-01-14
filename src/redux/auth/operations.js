import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  unset() {
    axios.defaults.headers.common.Authorization = ``;
  },
};

export const registration = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/signup', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/auth/logout');
      token.unset();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post('/auth/login', credentials);
      token.set(res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();

    if (state.auth.token === null) {
      return rejectWithValue('Unable to fetch user');
    }

    try {
      token.set(state.auth.token);
      const res = await axios.get('/auth/current');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post('/auth/refreshToken', credentials);
      token.set(res.data.result.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
