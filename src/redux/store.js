import { configureStore } from '@reduxjs/toolkit';
import authSignUpReducer from './slices/authSlice';

const reducer = {
  user: authSignUpReducer,
};

const store = configureStore({ reducer });

export default store;
