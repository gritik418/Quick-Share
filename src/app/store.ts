import authReducer from "@/features/auth/authSlice";
import fileReducer from "@/features/file/fileSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    file: fileReducer,
  },
});

export default store;
