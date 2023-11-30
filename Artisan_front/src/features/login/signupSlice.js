import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const signupUser = createAsyncThunk(
  "register/registerUser",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/users/",
        data,
      );
      return console.log(response.data);
    } catch (error) {
      // Handle error appropriately, e.g., by throwing or returning an error object
      throw error;
    }
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    //return data
  },
);

const signupSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.user = null;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "idle";
        state.user = null;
        //state.error = 'failed'
        state.error = action.error.message;
      });
  },
});

export default signupSlice.reducer;
