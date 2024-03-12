// Importing the createTheme function from Material-UI
import { createTheme } from "@mui/material";

// Function to generate a theme based on the specified dark mode setting
const getTheme = (darkMode: boolean) =>
  // Creating a Material-UI theme with the specified mode (dark or light)
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

// Exporting the getTheme function
export default getTheme;
