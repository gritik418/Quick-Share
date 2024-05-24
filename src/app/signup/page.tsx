"use client";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import styles from "./Signup.module.css";
import Link from "next/link";
import { InputGroup, InputRightElement, Button, Input } from "@chakra-ui/react";

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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

          <label htmlFor="first_name" className={styles.label}>
            First Name
          </label>
          <Input
            className={`${styles.input} mb-8`}
            name="first_name"
            id="first_name"
            pr="4.5rem"
            type="text"
            placeholder="Enter First Name"
          />

          <label htmlFor="last_name" className={styles.label}>
            Last Name
          </label>
          <Input
            className={`${styles.input} mb-8`}
            name="last_name"
            id="last_name"
            pr="4.5rem"
            type="text"
            placeholder="Enter Last Name"
          />

          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <Input
            className={`${styles.input} mb-8`}
            name="email"
            id="email"
            pr="4.5rem"
            type="email"
            placeholder="Enter Email Address"
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <InputGroup size="md" className={`${styles.input} mb-8`}>
            <Input
              name="password"
              id="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter Password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          <label htmlFor="confirm_password" className={styles.label}>
            Confirm Password
          </label>

          <InputGroup size="md" className={styles.input}>
            <Input
              name="password_confirmation"
              id="confirm_password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter Confirm Password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          <button className={styles.btn}>Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
