import axios from "axios";
import { File } from "buffer";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const uploadFile = async (file: File) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/file/upload`,
      {
        file,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const findFile = async (link: string) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/file/find`,
      {
        link,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const downloadFile = async (link: string) => {
  try {
    const response = await axios.get(link, {
      withCredentials: true,
      responseType: "blob",
    });
    return response;
  } catch (error: any) {
    return error.response.data;
  }
};
