"use client";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Link from "next/link";
import { InputGroup, InputRightElement, Button, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectLoginErrors,
  selectLoginLoading,
  userLoginAsync,
} from "@/features/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import loginSchema, { LoginDataType } from "@/validators/loginSchema";
import { redirect } from "next/navigation";
import { useFormik } from "formik";

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  const loading: boolean = useSelector(selectLoginLoading);
  const errors: LoginDataType = useSelector(selectLoginErrors);

  const handleClick = () => setShow(!show);

  const handleLogin = (values: LoginDataType) => {
    dispatch(userLoginAsync(values));
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: LoginDataType) => {
      handleLogin(values);
    },
    validationSchema: loginSchema,
  });

  useEffect(() => {
    console.log(isLoggedIn);
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
            Don&apos;t have an account?
            <Link href={"/signup"} className={styles.link}>
              {" "}
              Create a free account
            </Link>
          </p>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <Input
              className={styles.input}
              name="email"
              onChange={formik.handleChange}
              id="email"
              value={formik.values.email}
              pr="4.5rem"
              type="email"
              placeholder="Enter email address"
            />
            <span className={styles.error}>{`${
              errors?.email
                ? errors?.email
                : formik.errors?.email !== undefined
                ? formik.errors?.email![0]?.toUpperCase() +
                  formik?.errors?.email?.slice(1)
                : ""
            }`}</span>

            <div className={styles.group}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>

              <div className={styles.forgot}>
                <Link href={"/forgot-password"}> Forgot Password?</Link>
              </div>
            </div>
            <InputGroup size="md" className={styles.input}>
              <Input
                onChange={formik.handleChange}
                name="password"
                id="password"
                value={formik.values.password}
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

            <span className={styles.error}>{`${
              errors?.password
                ? errors?.password
                : formik.errors?.password !== undefined
                ? formik.errors?.password![0]?.toUpperCase() +
                  formik?.errors?.password?.slice(1)
                : ""
            }`}</span>

            <button className={styles.btn} type="submit">
              {loading ? "Processing..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
