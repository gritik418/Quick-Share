"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./Download.module.css";
import Navbar from "@/components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { findFileAsync } from "@/features/file/fileSlice";

const Download = () => {
  const [fileLink, setFileLink] = useState<string>();
  const dispatch = useDispatch<Dispatch<any>>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileLink(e.target.value);
  };

  const handleFindFile = () => {
    if (!fileLink) return;
    dispatch(findFileAsync(fileLink!));
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
          Continue
        </button>
      </div>
    </>
  );
};

export default Download;
