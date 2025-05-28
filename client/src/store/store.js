import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // adjust path if needed

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
