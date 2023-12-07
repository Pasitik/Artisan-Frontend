import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  streets: null,
  status: 'idle',
  error: null,
};

export const getStreets = createAsyncThunk(
  'location/street',
  async (getCategory) => getCategory(),
);

export const fetchStreets = createSlice({
  name: 'streets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStreets.pending, (state) => {
        state.status = 'loading';
        state.streets = null;
        state.error = null;
      })
      .addCase(getStreets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.streets = action.payload;
      })
      .addCase(getStreets.rejected, (state, action) => {
        state.status = 'failed';
        state.streets = null;
        state.error = action.error.message;
      });
  },
});
export default fetchStreets.reducer;
