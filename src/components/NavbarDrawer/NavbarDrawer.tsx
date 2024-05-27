import {
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Drawer,
} from "@chakra-ui/react";
import { useRef } from "react";
import styles from "./NavbarDrawer.module.css";
import { FaHamburger } from "react-icons/fa";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FaDownload } from "react-icons/fa6";

const NavbarDrawer = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div ref={btnRef} onClick={onOpen} className={styles.btn}>
        <FaHamburger />
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody className={styles.body}>
            <Link
              className={`${styles.item} ${pathname === "/" && styles.active}`}
              href={"/"}
            >
              <GoHomeFill /> Home
            </Link>
            <Link
              className={`${styles.item} ${
                pathname === "/download" && styles.active
              }`}
              href={"/download"}
            >
              <FaDownload /> Download
            </Link>
            {!isLoggedIn && (
              <>
                <Link
                  className={`${styles.item} ${
                    pathname === "/login" && styles.active
                  }`}
                  href={"/login"}
                >
                  <FiLogIn /> Login
                </Link>
                <Link
                  className={`${styles.item} ${
                    pathname === "/signup" && styles.active
                  }`}
                  href={"/signup"}
                >
                  <FaUserPlus /> Sign Up
                </Link>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavbarDrawer;
