import React from "react";
import styles from "./layout.module.css";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
