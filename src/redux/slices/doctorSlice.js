import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://finalcapstonedoctorappointment.herokuapp.com/api/v1';
const http = axios.create({ baseURL: BASE_URL });

const initialState = {
  isLoading: false,
  isFaild: false,
  doctors: [],
};

export const doctorsCreateThunk = createAsyncThunk(
  'doctors/create',
  async (doctor) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: doctor.token,
    };
    const URL = `${BASE_URL}/doctors/`;
    await http.post(URL, doctor, { headers });
  },
);

export const doctorsFetchThunk = createAsyncThunk(
  'doctors/fetch',
  async () => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const URL = `${BASE_URL}/doctors/`;
    const { data } = await http.get(URL, { headers });
    return data;
  },
);

export const doctorsDeleteThunk = createAsyncThunk(
  'doctors/delete',
  async (user, doctorId) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: user.token.token,
    };
    const URL = `${BASE_URL}/doctors/${doctorId}`;
    await http.delete(URL, { headers });
  },
);

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
  },
  extraReducers: {
    [doctorsFetchThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.doctors = action.payload;
    },
    [doctorsFetchThunk.pending]: (state) => { state.isLoading = true; },
    [doctorsFetchThunk.rejected]: (state) => { state.isFaild = true; },
  },
});
export default doctorSlice.reducer;
