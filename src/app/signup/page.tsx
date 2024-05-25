"use client";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import styles from "./Signup.module.css";
import Link from "next/link";
import { InputGroup, InputRightElement, Button, Input } from "@chakra-ui/react";
import signupSchema, { SignupDataType } from "@/validators/signupSchema";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  selectSignupErrors,
  selectSignupLoading,
  userSignupAsync,
} from "@/features/auth/authSlice";

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch<Dispatch<any>>();
  const errors: SignupDataType = useSelector(selectSignupErrors);
  const loading: boolean = useSelector(selectSignupLoading);

  const handleSignup = (values: SignupDataType) => {
    dispatch(userSignupAsync(values));
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: (values: SignupDataType) => {
      handleSignup(values);
    },
    validationSchema: signupSchema,
  });

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Create a new account</h1>
          <p className={styles.title}>
            Already have an account?
            <Link href={"/login"} className={styles.link}>
              {" "}
              Login
            </Link>
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div className={styles.group}>
              <label htmlFor="first_name" className={styles.label}>
                First Name
              </label>
              <Input
                className={`${styles.input} mb-8`}
                name="first_name"
                id="first_name"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                pr="4.5rem"
                type="text"
                placeholder="Enter First Name"
              />
              <span className={styles.error}>{`${
                errors?.first_name
                  ? errors?.first_name
                  : formik.errors?.first_name !== undefined
                  ? formik.errors?.first_name![0]?.toUpperCase() +
                    formik?.errors?.first_name?.slice(1)
                  : ""
              }`}</span>
            </div>

            <div className={styles.group}>
              <label htmlFor="last_name" className={styles.label}>
                Last Name
              </label>
              <Input
                className={`${styles.input} mb-8`}
                onChange={formik.handleChange}
                value={formik.values.last_name}
                name="last_name"
                id="last_name"
                pr="4.5rem"
                type="text"
                placeholder="Enter Last Name"
              />
              <span className={styles.error}>{`${
                errors?.last_name
                  ? errors?.last_name
                  : formik.errors?.last_name !== undefined
                  ? formik.errors?.last_name![0]?.toUpperCase() +
                    formik?.errors?.last_name?.slice(1)
                  : ""
              }`}</span>
            </div>

            <div className={styles.group}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <Input
                className={`${styles.input} mb-8`}
                name="email"
                id="email"
                pr="4.5rem"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                placeholder="Enter Email Address"
              />
              <span className={styles.error}>{`${
                errors?.email
                  ? errors?.email
                  : formik.errors?.email !== undefined
                  ? formik.errors?.email![0]?.toUpperCase() +
                    formik?.errors?.email?.slice(1)
                  : ""
              }`}</span>
            </div>

            <div className={styles.group}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <InputGroup size="md" className={`${styles.input} mb-8`}>
                <Input
                  name="password"
                  id="password"
                  pr="4.5rem"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
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
            </div>

            <div className={styles.group}>
              <label htmlFor="confirm_password" className={styles.label}>
                Confirm Password
              </label>

              <InputGroup size="md" className={styles.input}>
                <Input
                  name="password_confirmation"
                  id="confirm_password"
                  pr="4.5rem"
                  onChange={formik.handleChange}
                  value={formik.values.password_confirmation}
                  type={show ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <span className={styles.error}>{`${
                errors?.password_confirmation
                  ? errors?.password_confirmation
                  : formik.errors?.password_confirmation !== undefined
                  ? formik.errors?.password_confirmation![0]?.toUpperCase() +
                    formik?.errors?.password_confirmation?.slice(1)
                  : ""
              }`}</span>
            </div>

            <button className={styles.btn} type="submit">
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
