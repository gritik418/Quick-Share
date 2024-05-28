"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./UploadSection.module.css";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  selectFileLink,
  selectUploadLoading,
  uploadFileAsync,
} from "@/features/file/fileSlice";
import { File } from "buffer";
import { Bounce, toast } from "react-toastify";

const UploadSection = () => {
  const [file, setFile] = useState<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const link: string = useSelector(selectFileLink);
  const loading: boolean = useSelector(selectUploadLoading);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files == null) return;
    setFile(e.target?.files[0]);
  };

  const handleClick = () => {
    if (!file) {
      toast.error("Please select a file.", {
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
      return;
    }
    dispatch(uploadFileAsync(file as File));
  };

  const copyToClipboard = () => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    toast.success("Link Copied!", {
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
  };

  return (
    <>
      <h1 className={styles.heading}>
        Transfer your <span className={styles.highlight}>Files</span> over the{" "}
        <span className={styles.highlight}>Internet </span> for{" "}
        <span className={styles.highlight}>Free.</span>
      </h1>
      <div className={styles.container}>
        <div className={styles.stack}>
          <input
            type="file"
            id="file"
            className={styles.input}
            onChange={handleChange}
          />
          <Image
            src={`${
              file ? "/images/uploadImage.jpg" : "/images/uploadEmpty.jpg"
            }`}
            height={200}
            width={200}
            alt="upload"
          />
        </div>

        <p>{file?.name}</p>

        <p className={styles.title}>
          Drag your files here or,
          <label htmlFor="file" className={styles.label}>
            {" "}
            Browse
          </label>
        </p>

        <button className={styles.btn} onClick={handleClick}>
          {loading ? "Uploading..." : "Generate Link"}
        </button>

        {link && (
          <div className={styles.linkBox}>
            <textarea className={styles.link} value={link} readOnly />
            <div className={styles.copy} onClick={copyToClipboard}>
              <Tooltip content="Copy to Clipboard">
                <FaCopy />
              </Tooltip>
            </div>
          </div>
        )}

        <div className={styles.divider}></div>

        <p className={styles.title}>Share File via Email</p>

        <div className={styles.group}>
          <label className={styles.email_label} htmlFor="receiver_email">
            Receiver&apos;s Email
          </label>
          <input
            className={styles.email_input}
            placeholder="name@example.com"
            type="email"
            name="receiver_email"
            id="receiver_email"
          />
        </div>
        <button className={styles.btn}>Send Email</button>
      </div>
    </>
  );
};

export default UploadSection;
