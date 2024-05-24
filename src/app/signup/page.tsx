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
          <h1 className={styles.heading}>SignUp</h1>
          <p className={styles.title}>
            Already have an account?
            <Link href={"/login"} className={styles.link}>
              {" "}
              Login
            </Link>
          </p>

          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <Input
            className={`${styles.input} mb-8`}
            name="email"
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
          <button className={styles.btn}>SignUp</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
