"use client";
import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import NavbarDrawer from "../NavbarDrawer/NavbarDrawer";

const Navbar = () => {
  const router = useRouter();
  const isLoggedIn = false;

  const navigateTo = (route: string) => {
    router.push(route);
  };
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={styles.items}>
            <Link className={styles.logo} href={"/"}>
              QuickShare
            </Link>
          </li>
          <li className={styles.items}>
            <Link className={styles.item} href={"/"}>
              Download
            </Link>
          </li>
        </ul>

        {!isLoggedIn ? (
          <div className={styles.actions}>
            <button className={styles.btn} onClick={() => navigateTo("/login")}>
              <FiLogIn /> Login
            </button>
            <button
              className={styles.btn}
              onClick={() => navigateTo("/signup")}
            >
              <FaUserPlus /> Sign Up
            </button>
          </div>
        ) : (
          <Menu>
            <MenuButton>
              <Avatar
                size="md"
                name="Ryan Florence"
                src="https://bit.ly/ryan-florence"
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        )}

        <NavbarDrawer />
      </nav>
    </div>
  );
};

export default Navbar;
