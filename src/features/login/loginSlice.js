import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (login) => await login(),
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.user = action.payload;
        state.token = action.payload.access;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'idle';
        state.user = null;
        //state.error = 'failed'
        state.error = action.error;
      });
  },
});

export default loginSlice.reducer;
