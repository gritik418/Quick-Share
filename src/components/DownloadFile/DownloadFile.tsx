"use client";
import React from "react";
import styles from "./DownloadFile.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectFileInfo } from "@/features/file/fileSlice";
import { FaDownload } from "react-icons/fa6";

type FileType = {
  fileSize: number;
  originalName: string;
  fileType: string;
};

const DownloadFile = () => {
  const file: FileType = useSelector(selectFileInfo);
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

      <button className={styles.btn}>
        Download <FaDownload />
      </button>
    </div>
  );
};

export default DownloadFile;
