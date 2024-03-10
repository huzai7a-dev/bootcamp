import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import Header from './Header';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery } from '@mui/material';

const drawerWidth = 240;

interface Props {
  children: React.ReactNode,
  isAuthenticated: boolean,
  darkMode: boolean,
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const routes = [
  {
    title: 'Dashboard',
    path: '/',
    Icon: DashboardIcon
  },
  {
    title: 'Movies',
    path: '/movies',
    Icon: PersonalVideoIcon
  },
];

export default function Layout({ children, isAuthenticated, darkMode, setDarkMode }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!isAuthenticated) return <>{children}</>

  const drawerContent = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {routes.map((route) => (
          <Link key={route.path} style={{ color: 'inherit', textDecoration: 'none' }} to={route.path}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <route.Icon />
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
    <Box sx={{ display: 'flex' }}>
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
              sx={{ mr: 2, display: { sm: 'none' } }}
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
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
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
