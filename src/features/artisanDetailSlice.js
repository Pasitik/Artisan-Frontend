import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  artisan: null,
  status: 'idle',
  error: null,
};

export const getArtisan = createAsyncThunk(
  'artisan/info',
  async (getCategory) => getCategory(),
);

export const fetchArtisan = createSlice({
  name: 'artisan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtisan.pending, (state) => {
        state.status = 'loading';
        state.artisan = null;
        state.error = null;
      })
      .addCase(getArtisan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.artisan = action.payload;
      })
      .addCase(getArtisan.rejected, (state, action) => {
        state.status = 'failed';
        state.artisan = null;
        state.error = action.error.message;
      });
  },
});
export default fetchArtisan.reducer;
