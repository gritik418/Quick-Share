"use client";
import React, { useState } from "react";
import styles from "./Verify.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmail,
  selectVerifyLoading,
  verifyEmailAsync,
} from "@/features/auth/authSlice";
import { redirect } from "next/navigation";
import { Dispatch } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";

const Verify = () => {
  const email: string = useSelector(selectUserEmail);
  const loading: boolean = useSelector(selectVerifyLoading);
  const [otp, setOtp] = useState<string>("");
  const dispatch = useDispatch<Dispatch<any>>();

  if (!email) {
    redirect("/signup");
  }
  const handleVerifyEmail = () => {
    if (otp?.length < 6) {
      toast.error("Please enter valid Otp.", {
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
    dispatch(verifyEmailAsync({ email, secretKey: otp! }));
  };
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Image
          className={styles.image}
          src={"/images/verifyIcon.jpg"}
          alt="verify"
          height={200}
          width={200}
        />
        <h1 className={styles.heading}>Verify your Email Address</h1>
        <p className={styles.title}>
          Enter the 6 digit code we sent to{" "}
          <span className={styles.highlight}>{email} </span>
          to verify your email address.
        </p>
        <HStack className={styles.otp}>
          <PinInput
            size="lg"
            placeholder=""
            value={otp}
            autoFocus
            onChange={(value: string) => setOtp(value)}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

        <button className={styles.btn} onClick={handleVerifyEmail}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </>
  );
};

export default Verify;
