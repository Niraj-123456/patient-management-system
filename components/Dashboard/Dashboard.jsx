import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "./dashboard.module.css";

import Header from "../common/Header/Header";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const { data } = session;
  const user = data?.user;

  useEffect(() => {
    if (!user) router.push("/");
  }, [user, router]);

  return (
    <div className={styles.container}>
      <Header />
    </div>
  );
};

export default Dashboard;
