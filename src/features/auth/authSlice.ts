import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LoginDataType,
  SignupDataType,
  userLogin,
  userSignup,
} from "./authAPI";

const initialState = {
  isLoggedIn: false,
  loginLoading: false,
  signupLoading: false,
};

export const userLoginAsync = createAsyncThunk(
  "auth/userLogin",
  async (loginInfo: LoginDataType) => {
    const response = await userLogin(loginInfo);
    return response;
  }
);

export const userSignupAsync = createAsyncThunk(
  "auth/userSignup",
  async (signupInfo: SignupDataType) => {
    const response = await userSignup(signupInfo);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAsync.pending, (state, action) => {
        state.loginLoading = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        console.log(action.payload);
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.loginLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(userSignupAsync.pending, (state, action) => {
        state.signupLoading = true;
      })
      .addCase(userSignupAsync.fulfilled, (state, action) => {
        state.signupLoading = false;
        console.log(action.payload);
      })
      .addCase(userSignupAsync.rejected, (state, action) => {
        state.signupLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLoginLoading = (state: any) => state.auth.loginLoading;
export const selectSignupLoading = (state: any) => state.auth.signupLoading;

export default authSlice.reducer;
