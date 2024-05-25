import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type LoginDataType = {
  email: string;
  password: string;
};

export type SignupDataType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const userLogin = async (loginInfo: LoginDataType) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, loginInfo, {
      headers: {
        "Content-Type": "application/json",
      },
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
