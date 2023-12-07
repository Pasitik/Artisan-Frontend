import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  states: null,
  status: 'idle',
  error: null,
};

export const getStates = createAsyncThunk('location/states', async (getState) =>
  getState(),
);

const fetchStates = createSlice({
  name: 'states',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStates.pending, (state) => {
        state.status = 'loading';
        state.states = null;
        state.error = null;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.states = action.payload;
      })
      .addCase(getStates.rejected, (state, action) => {
        state.status = 'failed';
        state.states = null;
        state.error = action.error.message;
      });
  },
});
export default fetchStates.reducer;
