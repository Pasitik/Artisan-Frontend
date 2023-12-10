import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  category: [],
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
        state.category = [];
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.data = [];
        state.category = action.error.message;
      });
  },
});

export default fetchCategory.reducer;
