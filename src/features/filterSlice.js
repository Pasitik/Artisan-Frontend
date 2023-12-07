import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: {
    streets: null,
    cities: null,
    states: null,
  },
  status: 'idle',
  error: null,
};

export const getLocation = createAsyncThunk(
  'artisan/location',
  async (getCategory) => getCategory(),
);

export const fetchStates = createSlice({
  name: 'states',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocation.pending, (state) => {
        state.status = 'loading';
        state.data.states = null;
        state.error = null;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.data.states = action.payload;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.data.states = null;
        state.error = action.error.message;
      });
  },
});

export const fetchCities = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocation.pending, (state) => {
        state.status = 'loading';
        state.data.cities = null;
        state.error = null;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.data.cities = action.payload;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.data.cities = null;
        state.error = action.error.message;
      });
  },
});

// expst citiesReducer = fetchCities.reducer
// export {statesReducer, citiesReducer};
