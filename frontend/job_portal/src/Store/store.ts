import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/auth/authSlice";

const store = configureStore({
  reducer: {
    // auth: authSlice,
  },
});


export default store;
