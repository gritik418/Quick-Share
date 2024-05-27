import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { downloadFile, findFile, uploadFile } from "./fileAPI";
import { File } from "buffer";

const initialState = {
  uploadLoading: false,
  fileLink: "",
  findLoading: false,
  file: <any>{},
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

export const downloadFileAsync = createAsyncThunk(
  "file/downloadFile",
  async (link: string) => {
    const response = await downloadFile(link);
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
      })
      .addCase(downloadFileAsync.fulfilled, (state, action) => {
        const url = window.URL.createObjectURL(new Blob([action.payload.data]));
        const linkAttribute = document.createElement("a");
        linkAttribute.href = url;
        linkAttribute.setAttribute("download", state.file.originalName);
        document.body.appendChild(linkAttribute);
        linkAttribute.click();
      });
  },
});

export const selectFileLink = (state: any) => state.file.fileLink;
export const selectUploadLoading = (state: any) => state.file.uploadLoading;
export const selectFindLoading = (state: any) => state.file.findLoading;
export const selectFileInfo = (state: any) => state.file.file;
export const selectDownloadLink = (state: any) => state.file.downloadLink;

export default fileSlice.reducer;
