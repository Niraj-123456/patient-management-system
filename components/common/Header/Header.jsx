import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./header.module.css";
import {
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import { Settings, Logout, CalendarMonth } from "@mui/icons-material";
import { useSession, signOut } from "next-auth/react";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 13,
}));

const Header = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const user = data?.user;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>Hello, {user?.name}</p>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            src={user?.image}
            sx={{ width: 30, height: 30, cursor: "pointer" }}
          />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.5,
            "& .MuiAvatar-root": {
              width: 25,
              height: 25,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <StyledMenuItem onClick={() => router.push(`/profile/${user?.id}`)}>
          <ListItemIcon>
            <Avatar />
          </ListItemIcon>
          Profile
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <Avatar />
          </ListItemIcon>
          My account
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => router.push(`/appointments/${user?.id}`)}
        >
          <ListItemIcon>
            <CalendarMonth sx={{ width: 20, height: 20, mr: 1 }} />
          </ListItemIcon>
          My appointments
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </StyledMenuItem>
        <StyledMenuItem
          onClick={handleLogout}
          disabled={Boolean(status === "loading")}
        >
          <ListItemIcon>
            {status !== "loading" ? (
              <Logout fontSize="small" />
            ) : (
              <CircularProgress size={15} thickness={3} />
            )}
          </ListItemIcon>
          Logout
        </StyledMenuItem>
      </Menu>
    </div>
  );
};

export default Header;
