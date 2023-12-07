import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  cities: null,
  status: 'idle',
  error: null,
};

export const getCities = createAsyncThunk(
  'location/cities',
  async (getCategory) => getCategory(),
);

export const fetchCities = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.status = 'loading';
        state.cities = null;
        state.error = null;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.cities = action.payload;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.status = 'failed';
        state.cities = null;
        state.error = action.error.message;
      });
  },
});
export default fetchCities.reducer;
