import React from "react";
import styles from "./Download.module.css";
import Navbar from "@/components/Navbar/Navbar";

const Download = () => {
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
            className={styles.input}
          />
        </div>

        <button className={styles.btn}>Continue</button>
      </div>
    </>
  );
};

export default Download;
