import React from "react";
import styles from "./layout.module.css";

import { useSession } from "next-auth/react";

import Header from "../Header/Header";
import { CircularProgress } from "@mui/material";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.container}>
      {status === "loading" ? (
        <CircularProgress size={35} thickness={4} />
      ) : (
        <React.Fragment>
          {session && <Header />}
          <div className={styles.content}>{children}</div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Layout;
