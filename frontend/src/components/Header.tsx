// React and Redux imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI component imports
import {
  IconButton,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

// Router and other imports
import { logout } from "../reducers/authSlice";
import { RootState } from "../App";
import { AppDispatch } from "../main";

// TypeScript interface for component props
interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

// Header functional component
const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
}) => {
  const dispatch:AppDispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  // Event handler for logging out
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Logo display */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar alt={authState.user?.displayName} src={authState?.user?.image} />
            </Box>

            {/* User authentication and theme toggle buttons */}
            <Box>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>

              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Box>
  );
};

export default Header;