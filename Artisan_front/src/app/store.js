import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import signupReducer from "../features/login/signupSlice";

export const store = configureStore({
  reducer: {
    users: loginReducer,
    signup: signupReducer,
  },
});
