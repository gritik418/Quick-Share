"use client";
import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import NavbarDrawer from "../NavbarDrawer/NavbarDrawer";
import { MdSpaceDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAsync,
  logOut,
  selectIsLoggedIn,
} from "@/features/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch<Dispatch<any>>();
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={styles.items}>
            <Link className={styles.logo} href={"/"}>
              QuickShare
            </Link>
          </li>
          <li className={`${styles.items} ${styles.hide}`}>
            <Link className={styles.item} href={"/download"}>
              Download
            </Link>
          </li>
        </ul>

        {!isLoggedIn ? (
          <>
            <div className={styles.actions}>
              <button
                className={styles.btn}
                onClick={() => navigateTo("/login")}
              >
                <FiLogIn /> Login
              </button>
              <button
                className={styles.btn}
                onClick={() => navigateTo("/signup")}
              >
                <FaUserPlus /> Sign Up
              </button>
            </div>

            <NavbarDrawer isLoggedIn />
          </>
        ) : (
          <>
            <div className={styles.group}>
              <Menu>
                <MenuButton>
                  <Avatar
                    size="md"
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem className={styles.menuItem}>
                    <MdSpaceDashboard /> Dashboard
                  </MenuItem>
                  <MenuItem className={styles.menuItem} onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </MenuItem>
                </MenuList>
              </Menu>
              <NavbarDrawer isLoggedIn />
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
