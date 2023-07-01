import React from "react";
import styles from "./layout.module.css";

import { useSession } from "next-auth/react";
import Header from "../Header/Header";
import { CircularProgress } from "@mui/material";

const Layout = ({ children }) => {
  const session = useSession();
  const { data, status } = session;
  const user = data?.user;

  return (
    <div className={styles.container}>
      {status === "loading" ? (
        <CircularProgress size={35} thickness={4} />
      ) : (
        <React.Fragment>
          {user && <Header />}
          <div className={styles.content}>{children}</div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Layout;
