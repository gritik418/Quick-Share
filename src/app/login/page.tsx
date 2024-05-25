"use client";
import Navbar from "@/components/Navbar/Navbar";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Login.module.css";
import Link from "next/link";
import { InputGroup, InputRightElement, Button, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectLoginLoading,
  userLoginAsync,
} from "@/features/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { LoginDataType } from "@/features/auth/authAPI";
import { redirect } from "next/navigation";

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  const loading: boolean = useSelector(selectLoginLoading);
  const [userData, setUserData] = useState<LoginDataType>({
    email: "",
    password: "",
  });

  const handleClick = () => setShow(!show);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = () => {
    dispatch(userLoginAsync(userData));
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    redirect("/");
  }, [isLoggedIn]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Login</h1>
          <p className={styles.title}>
            Don't have an account?
            <Link href={"/signup"} className={styles.link}>
              {" "}
              Create a free account
            </Link>
          </p>

          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <Input
            className={`${styles.input} mb-8`}
            name="email"
            onChange={handleChange}
            id="email"
            pr="4.5rem"
            type="email"
            placeholder="Enter email address"
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <InputGroup size="md" className={styles.input}>
            <Input
              onChange={handleChange}
              name="password"
              id="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          <div className={styles.forgot}>
            <Link href={"/forgot-password"}> Forgot Password?</Link>
          </div>
          <button className={styles.btn} onClick={handleLogin}>
            {loading ? "Processing..." : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
