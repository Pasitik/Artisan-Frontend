import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const getCategory = createAsyncThunk(
  'artisan/category',
  async (getCategory) => getCategory(),
);

const fetchCategory = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.status = 'loading';
        state.data = [];
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default fetchCategory.reducer;
