import { LoginDataType } from "@/validators/loginSchema";
import { SignupDataType } from "@/validators/signupSchema";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const userLogin = async (loginInfo: LoginDataType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, loginInfo, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const userSignup = async (signupInfo: SignupDataType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/signup`, signupInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
