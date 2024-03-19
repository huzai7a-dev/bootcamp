// React imports for building components and managing state
import React, { useState } from "react";

// MUI core components for layout and styling
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { useTheme, useMediaQuery, CircularProgress } from "@mui/material";

// MUI icons for adding icons to the UI
import MenuIcon from "@mui/icons-material/Menu";

// Custom components specific to the project
import Header from "./Header";

// Router imports for navigation and location detection within the app
import { Link, useLocation } from "react-router-dom";

// Redux-related imports for state management across the app
import { useAppSelector } from "../services/hooks";
import { RootState } from "../main";

import { routes } from "../constants/routes";

const drawerWidth = 200;

interface Props {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Layout({ children, darkMode, setDarkMode }: Props) {
  const theme = useTheme();
  const { isLoggedIn, pending: isPending } = useAppSelector(
    (state: RootState) => state.auth
  );
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activeRoute = location.pathname;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (isPending)
    return (
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!isLoggedIn) return <>{children}</>;

  const drawerContent = (
    <div>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="64px"
        justifyContent="center"
        borderBottom="1px solid #ccc"
      >
        <img
          src={
            "https://www.xgrid.co/_next/static/media/xgrid-logo-menu.83dfe4a4.svg?auto=format&fit=max&w=128"
          }
          alt="Logo"
          style={{
            width: "auto",
            height: "40px",
            marginRight: "10px",
          }}
        />
      </Box>
      <Divider />
      <List>
        {routes.map((route) => (
          <Link
            key={route.path}
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
            }}
            to={route.path}
          >
            <ListItem disablePadding>
              <ListItemButton
                style={{
                  background: `${
                    activeRoute === route.path
                      ? "rgba(0, 0, 0, 0.08)"
                      : "transparent"
                  }`,
                }}
              >
                <ListItemIcon>
                  <route.Icon style={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary={route.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}