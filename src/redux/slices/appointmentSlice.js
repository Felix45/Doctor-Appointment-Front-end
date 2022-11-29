import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://finalcapstonedoctorappointment.herokuapp.com/api/v1';
const http = axios.create({ baseURL: BASE_URL });

const initialState = {
  isLoading: false,
  isFaild: false,
  appointments: [],
};

export const appointmentsCreateThunk = createAsyncThunk(
  'appointments/create',
  async (appointment) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: appointment.token,
    };
    const URL = `${BASE_URL}/users/${appointment.user_id}/appointments/`;
    await http.post(URL, appointment, { headers });
  },
);

export const appointmentsFetchThunk = createAsyncThunk(
  'appointments/fetch',
  async (user) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: user.token,
    };
    const URL = `${BASE_URL}/users/${user.id}/appointments/`;
    const { data } = await http.get(URL, { headers });
    return data;
  },
);

export const appointmentsDeleteThunk = createAsyncThunk(
  'appointments/delete',
  async (user) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: user.token.token,
    };
    const URL = `${BASE_URL}/users/${user.token.id}/appointments/${user.appointmentId}`;
    await http.delete(URL, { headers });
  },
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearAppointments(state) {
      return {
        ...state,
        appointments: [],
      };
    },
  },
  extraReducers: {
    [appointmentsFetchThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.appointments = action.payload;
    },
    [appointmentsFetchThunk.pending]: (state) => { state.isLoading = true; },
    [appointmentsFetchThunk.rejected]: (state) => { state.isFaild = true; },
  },
});
export const { clearAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;
