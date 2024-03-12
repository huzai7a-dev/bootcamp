// Import icons from MUI for navigation items.
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import DashboardIcon from "@mui/icons-material/Dashboard";

// Define navigation routes for the application.
export const routes = [
  {
    title: "Movies",
    path: "/",
    Icon: PersonalVideoIcon,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    Icon: DashboardIcon,
  },
];