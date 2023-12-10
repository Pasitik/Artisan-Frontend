import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  address: null,
  status: 'idle',
  error: null,
};

export const getHouseNumber = createAsyncThunk(
  'location/house',
  async (getCategory) => getCategory(),
);

export const fetchHouseNumber = createSlice({
  name: 'address line',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHouseNumber.pending, (state) => {
        state.status = 'loading';
        state.address = null;
        state.error = null;
      })
      .addCase(getHouseNumber.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.address = action.payload;
      })
      .addCase(getHouseNumber.rejected, (state, action) => {
        state.status = 'failed';
        state.address = null;
        state.error = action.error.message;
      });
  },
});
export default fetchHouseNumber.reducer;
