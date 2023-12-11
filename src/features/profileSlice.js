import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  customer: null,
  status: 'idle',
  error: null,
};

export const getCustomer = createAsyncThunk(
  'customer/info',
  async (getCategory) => getCategory(),
);

export const fetchCustomer = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomer.pending, (state) => {
        state.status = 'loading';
        state.customer = null;
        state.error = null;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.customer = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.customer = null;
        state.error = action.error.message;
      });
  },
});
export default fetchCustomer.reducer;
