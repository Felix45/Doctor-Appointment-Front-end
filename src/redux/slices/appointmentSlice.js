import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:3001/api/v1';
const http = axios.create({ baseURL: BASE_URL });

const initialState = {
  isLoading: false,
  isFaild: false,
  appointment: [],
};

export const appointmentsCreateThunk = createAsyncThunk(
  'appointments/create',
  async (appointment) => {
    const URL = `${BASE_URL}/users/${appointment.user_id}/appointments/`;
    const { data } = await http.post(URL, appointment);
    return data;
  },
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearAppointments(state) {
      return {
        ...state,
        appointment: [],
      };
    },
  },
  extraReducers: {
    [appointmentsCreateThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.appointment = action.payload;
    },
    [appointmentsCreateThunk.pending]: (state) => { state.isLoading = true; },
    [appointmentsCreateThunk.rejected]: (state) => { state.isFaild = true; },
  },
});
export const { clearAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;
