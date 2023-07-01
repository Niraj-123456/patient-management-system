import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "./dashboard.module.css";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  EventAvailable,
  People,
  DomainAdd,
  HealthAndSafety,
  LocalHospital,
  Healing,
} from "@mui/icons-material";
import Header from "../common/Header/Header";

const Dashboard = ({ posts }) => {
  const session = useSession();
  const router = useRouter();
  const { data, status } = session;
  const user = data?.user;

  useEffect(() => {
    if (!user || status === "unauthenticated") router.push("/");
  }, [user, router, status]);

  return (
    user && (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.features__container}>
            <Card
              sx={{
                maxWidth: 250,
                width: 250,
                border: "solid 1.75px #ccc",
                transition: "all 250ms ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
              onClick={() => router.push("/book/appointment")}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"20px 15px"}
              >
                <Typography whiteSpace={"nowrap"}>
                  Book an appointment
                </Typography>
                <EventAvailable />
              </Box>
            </Card>
            <Card
              sx={{
                maxWidth: 250,
                width: 250,
                border: "solid 1.75px #ccc",
                transition: "all 250ms ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"20px 15px"}
              >
                <Typography whiteSpace={"nowrap"}>View All Doctors</Typography>
                <People />
              </Box>
            </Card>
            <Card
              sx={{
                maxWidth: 250,
                width: 250,
                border: "solid 1.75px #ccc",
                transition: "all 250ms ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"20px 15px"}
              >
                <Typography whiteSpace={"nowrap"}>Hospitals</Typography>
                <DomainAdd />
              </Box>
            </Card>
            <Card
              sx={{
                maxWidth: 250,
                width: 250,
                border: "solid 1.75px #ccc",
                transition: "all 250ms ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"20px 15px"}
              >
                <Typography whiteSpace={"nowrap"}>Health Insurance</Typography>
                <HealthAndSafety />
              </Box>
            </Card>
            <Card
              sx={{
                maxWidth: 250,
                width: 250,
                border: "solid 1.75px #ccc",
                transition: "all 250ms ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"20px 15px"}
              >
                <Typography whiteSpace={"nowrap"}>Claim Insurance</Typography>
                <DomainAdd />
              </Box>
            </Card>
            <Card
              sx={{
                maxWidth: 250,
                width: 250,
                border: "solid 1.75px #ccc",
                transition: "all 250ms ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"20px 15px"}
              >
                <Typography whiteSpace={"nowrap"}>Health Posts</Typography>
                <Healing />
              </Box>
            </Card>
            <Card
              sx={{
                maxWidth: 250,
                width: 250,
                border: "solid 1.75px #ccc",
                transition: "all 250ms ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                },
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"20px 15px"}
              >
                <Typography whiteSpace={"nowrap"}>
                  Municipality Hospitals
                </Typography>
                <LocalHospital />
              </Box>
            </Card>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
