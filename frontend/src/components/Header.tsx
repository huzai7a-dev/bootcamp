// React and Redux imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI component imports
import {
  AppBar,
  Toolbar,
  Container,
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

// TypeScript interface for component props
interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  // isLoggedIn: boolean;
}

// Header functional component
const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  // Event handler for logging out
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(logout() as any);
  };

  // Component render
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
              {/* <Typography color="inherit" style={{ marginRight: "20px" }}>
                    {authState.user?.displayName}
                  </Typography> */}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              {/* {isLoggedIn ? (
                <>
                  <Typography color="inherit" style={{ marginRight: "20px" }}>
                    {username}
                  </Typography>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              )} */}
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Box>
  );
};

export default Header;