"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./Download.module.css";
import Navbar from "@/components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  findFileAsync,
  selectDownloadLink,
  selectFileInfo,
  selectFindLoading,
} from "@/features/file/fileSlice";
import DownloadFile from "@/components/DownloadFile/DownloadFile";

const Download = () => {
  const [fileLink, setFileLink] = useState<string>("");
  const dispatch = useDispatch<Dispatch<any>>();
  const downloadLink: string = useSelector(selectDownloadLink);
  const fileInfo = useSelector(selectFileInfo);
  const loading: boolean = useSelector(selectFindLoading);

  const handleFindFile = () => {
    if (!fileLink) return;
    dispatch(findFileAsync(fileLink!));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileLink(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Download Files</h1>

        <div className={styles.group}>
          <label htmlFor="" className={styles.label}>
            Enter Download Link
          </label>
          <input
            type="text"
            placeholder="Paste the link here"
            value={fileLink}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <button className={styles.btn} onClick={handleFindFile}>
          {loading ? "Processing..." : "Continue"}
        </button>

        {downloadLink && fileInfo && <DownloadFile />}
      </div>
    </>
  );
};

export default Download;
