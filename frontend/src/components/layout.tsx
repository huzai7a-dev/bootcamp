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
]

export default function Layout({ children, isAuthenticated, darkMode, setDarkMode }: Props) {

    if (!isAuthenticated) return <>{children}</>
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {routes.map((route) => (
                        <Link style={{color:"black", textDecoration:"none"}} to={route.path}>
                            <ListItem key={route.path} disablePadding>
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
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}