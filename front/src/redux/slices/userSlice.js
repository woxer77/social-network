import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';
import config from '../../configs/config';

/* eslint-disable no-use-before-define */

const initialState = {
  user: {
    userId: '',
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    isAuth: false
  }
};

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const response = await axios.get(`${config.url}/refresh`, { withCredentials: true });
      const { accessToken, user } = response.data;
      localStorage.setItem('token', accessToken);

      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.user.isAuth = action.payload;
    },
    setEmail(state, action) {
      state.user.email = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(checkAuth.pending, (state) => {
      // ����� ����� �������� ����� ��� ������ �������
      state.loading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      // ����� ����� �������� ����� ��� �������� ���������� �������
      state.loading = false;
      state.user = action.payload || {}; // �������� ������ ������������ �� payload
      state.user.isAuth = true;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      // ����� ����� �������� ����� ��� ������ �������
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const {
  setEmail, setUser, setAuth
} = userSlice.actions;

export default userSlice.reducer;
