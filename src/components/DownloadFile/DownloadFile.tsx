"use client";
import React from "react";
import styles from "./DownloadFile.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { downloadFileAsync, selectFileInfo } from "@/features/file/fileSlice";
import { FaDownload } from "react-icons/fa6";
import { Dispatch } from "@reduxjs/toolkit";

type FileType = {
  fileSize: number;
  originalName: string;
  fileType: string;
};

const DownloadFile = ({ downloadLink }: { downloadLink: string }) => {
  const file: FileType = useSelector(selectFileInfo);
  const dispatch = useDispatch<Dispatch<any>>();

  const handleDownload = () => {
    dispatch(downloadFileAsync(downloadLink));
  };
  return (
    <div className={styles.container}>
      <Image
        src={"/images/downloadIcon.png"}
        alt="download"
        height={150}
        width={150}
      />
      <p className={styles.fileName}>{file.originalName}</p>
      <p className={styles.fileSize}>{file.fileSize / 1000} KB</p>

      <button className={styles.btn} onClick={handleDownload}>
        Download <FaDownload />
      </button>
    </div>
  );
};

export default DownloadFile;
