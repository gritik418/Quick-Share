"use client";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import styles from "./Login.module.css";
import Link from "next/link";
import { InputGroup, InputRightElement, Button, Input } from "@chakra-ui/react";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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

          <InputGroup size="md">
            <Input
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
        </div>
      </div>
    </>
  );
};

export default Login;
