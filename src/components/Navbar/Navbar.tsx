import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";

const Navbar = () => {
  const isLoggedIn = false;
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
            <button className={styles.btn}>
              <FiLogIn /> Login
            </button>
            <button className={styles.btn}>
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
      </nav>
    </div>
  );
};

export default Navbar;
