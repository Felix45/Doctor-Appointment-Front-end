import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://finalcapstonedoctorappointment.herokuapp.com/api/v1/auth/login';
const http = axios.create({ baseURL: BASE_URL });

const initialState = {
  isLoading: false,
  isFaild: false,
  token: {},
};

export const userSignInThunk = createAsyncThunk(
  'users/signIn',
  async (user) => {
    const { data } = await http.post(BASE_URL, user);
    return data;
  },
);

const loginSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state) {
      return {
        ...state,
        token: {
          id: '', exp: '', email: '', isLoggedIn: false, token: '', username: '',
        },
      };
    },
  },
  extraReducers: {
    [userSignInThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    },
    [userSignInThunk.pending]: (state) => { state.isLoading = true; },
    [userSignInThunk.rejected]: (state) => { state.isFaild = true; },
  },
});
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
