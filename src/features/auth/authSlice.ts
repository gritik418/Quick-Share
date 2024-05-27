import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, userLogin, userSignup } from "./authAPI";
import { LoginDataType } from "@/validators/loginSchema";
import { Bounce, toast } from "react-toastify";
import { SignupDataType } from "@/validators/signupSchema";

const initialState = {
  isLoggedIn: false,
  loginLoading: false,
  signupLoading: false,
  loginErrors: {},
  signupErrors: {},
  user: {},
};

export const getUserAsync = createAsyncThunk("auth/getUser", async () => {
  const response = await getUser();
  return response;
});

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
      .addCase(getUserAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoggedIn = true;
          state.user = action.payload.user;
        }
      })
      .addCase(userLoginAsync.pending, (state, action) => {
        state.loginLoading = true;
        state.loginErrors = {};
        state.signupErrors = {};
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.loginLoading = false;
        if (action.payload.success) {
          state.isLoggedIn = true;
          toast.success(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          if (action.payload.errors) {
            state.loginErrors = action.payload.errors;
          } else {
            toast.error(action.payload.message, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        }
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.loginLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(userSignupAsync.pending, (state, action) => {
        state.signupLoading = true;
        state.loginErrors = {};
        state.signupErrors = {};
      })
      .addCase(userSignupAsync.fulfilled, (state, action) => {
        state.signupLoading = false;
        if (action.payload.success) {
          toast.success(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          if (action.payload.errors) {
            state.signupErrors = action.payload.errors;
          } else {
            toast.error(action.payload.message, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        }
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
export const selectSignupErrors = (state: any) => state.auth.signupErrors;
export const selectLoginErrors = (state: any) => state.auth.loginErrors;

export default authSlice.reducer;
