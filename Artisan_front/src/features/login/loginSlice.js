import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/jwt/create/",
        {
          username: credentials.username,
          password: credentials.password,
        },
      );

      if (!response.data) {
        throw new Error("Invalid username or password");
      }

        console.log("Success");
        console.log(response.data);
        localStorage.setItem('authToken', response.data.access);
        return response.data;
    } catch (error) {
      // Handle error appropriately, e.g., by throwing or returning an error object
      throw error;
    }
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    //return {credentials}
  },
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.status = 'loading'
            state.user = null
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.user = action.payload
            state.token = action.payload.access
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = 'idle'
            state.user = null
            //state.error = 'failed'
            state.error = action.error.message
        })
    }
})

export default loginSlice.reducer;
