import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

export const addArtisan = createAsyncThunk(
  'artisan/profile',
  async (addArtisan) => await addArtisan(),
);

const artisanSlice = createSlice({
  name: 'artisanProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addArtisan.pending, (state) => {
        state.status = 'loading';
        state.data = null;
        state.error = null;
      })
      .addCase(addArtisan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.data = action.payload;
      })
      .addCase(addArtisan.rejected, (state, action) => {
        state.status = 'idle';
        state.data = null;
        //state.error = 'failed'
        state.error = action.error;
      });
  },
});

export default artisanSlice.reducer;
