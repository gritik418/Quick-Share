import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findFile, uploadFile } from "./fileAPI";
import { File } from "buffer";

const initialState = {
  uploadLoading: false,
  fileLink: "",
  findLoading: false,
  file: {},
  downloadLink: "",
};

export const uploadFileAsync = createAsyncThunk(
  "file/uploadFile",
  async (file: File) => {
    const response = await uploadFile(file);
    return response;
  }
);

export const findFileAsync = createAsyncThunk(
  "file/findFile",
  async (link: string) => {
    const response = await findFile(link);
    return response;
  }
);

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileAsync.pending, (state, action) => {
        state.uploadLoading = true;
      })
      .addCase(uploadFileAsync.fulfilled, (state, action) => {
        state.uploadLoading = false;
        if (action.payload.success) {
          if (action.payload.link) {
            state.fileLink = action.payload.link;
          }
        }
      })
      .addCase(uploadFileAsync.rejected, (state, action) => {
        state.uploadLoading = false;
      })
      .addCase(findFileAsync.pending, (state, action) => {
        state.findLoading = true;
      })
      .addCase(findFileAsync.fulfilled, (state, action) => {
        state.findLoading = false;
        if (action.payload.success) {
          state.downloadLink = action.payload.downloadLink;
          state.file = action.payload.file;
        }
      })
      .addCase(findFileAsync.rejected, (state, action) => {
        state.findLoading = false;
      });
  },
});

export const selectFileLink = (state: any) => state.file.fileLink;
export const selectUploadLoading = (state: any) => state.file.uploadLoading;
export const selectFindLoading = (state: any) => state.file.findLoading;
export const selectFileInfo = (state: any) => state.file.file;
export const selectDownloadLink = (state: any) => state.file.downloadLink;

export default fileSlice.reducer;
