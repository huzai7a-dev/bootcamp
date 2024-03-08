// React and Redux imports
import React from "react";
import { useDispatch } from "react-redux";

// MUI component imports
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

// Router and other imports
import { logout } from "../reducers/authSlice";
import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";

// TypeScript interface for component props
interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  // isLoggedIn: boolean;
  username?: string;
}

// Header functional component
const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  // isLoggedIn,
  username,
}) => {
  const dispatch = useDispatch();

  // Event handler for logging out
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(logout() as any);
  };

  // Component render
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              <img src={reactLogo} alt="React Logo" style={{ height: "50px", marginRight: "10px" }} />
            </Box>

            {/* User authentication and theme toggle buttons */}
            <Box>
            <Typography color="inherit" style={{ marginRight: "20px" }}>
                    {username}
                  </Typography>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;