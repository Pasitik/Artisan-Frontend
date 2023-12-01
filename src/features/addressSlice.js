import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

export const addAddress = createAsyncThunk(
  "profile/addAddress",
  async (addAddress) => await addAddress(),
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.status = "loading";
        state.data = null;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = "idle";
        state.data = null;
        //state.error = 'failed'
        state.error = action.error;
      });
  },
});

export default addressSlice.reducer;
