"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./UploadSection.module.css";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";

const UploadSection = () => {
  const [file, setFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files == null) return;
    setFile(e.target?.files[0]);
  };

  const handleClick = () => {
    console.log(file);
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
          Generate Link
        </button>

        <div className={styles.linkBox}>
          <p className={styles.link}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
            nulla!
          </p>
          <Tooltip
            hasArrow
            label="Copy Link"
            className={styles.tooltip}
            bg="gray.300"
            color="black"
          >
            <div className={styles.copy}>
              <FaCopy />
            </div>
          </Tooltip>
        </div>

        <div className={styles.divider}></div>

        <p className={styles.title}>Share File via Email</p>

        <div className={styles.group}>
          <label className={styles.email_label} htmlFor="receiver_email">
            Receiver's Email
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
