import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://finalcapstonedoctorappointment.herokuapp.com/api/v1/users';
const http = axios.create({ baseURL: BASE_URL });

const initialState = {
  isLoading: false,
  isFaild: false,
  users: [],
};

export const userSignUpThunk = createAsyncThunk(
  'users/signUp',
  async (user) => {
    const { data } = await http.post(BASE_URL, user);
    return data;
  },
);

const authSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [userSignUpThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [userSignUpThunk.pending]: (state) => { state.isLoading = true; },
    [userSignUpThunk.rejected]: (state) => { state.isFaild = true; },
  },
});

export default authSlice.reducer;
