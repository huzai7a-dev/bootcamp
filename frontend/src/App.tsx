// React-related imports
import React, { useState, useEffect } from "react";

// Routing-related imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Material-UI imports
import { ThemeProvider, CssBaseline } from "@mui/material";

// Redux-related imports
import { useDispatch } from "react-redux";
import { checkStatus } from "./reducers/authSlice";

// Theme import
import getTheme from "./services/theme";

// Component imports
import LoginPage from "./pages/LoginPage";
import Movies from "./pages/Movies";
import ProtectRoute from "./ProtectRoute";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import { AppDispatch } from "./main";

// Define the shape of your state, adjust according to your state structure
export interface RootState {
  auth: {
    isLoggedIn: boolean;
    user: {
      _id: string;
      displayName: string;
      image?: string;
      // Add other user fields as needed
    } | null;
  };
  // Add other state slices as needed
}

//Main entry point App
const App: React.FC = () => {
  // State for managing dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkmode");
    return savedMode?.toLowerCase() === "true";
  });

  // Generate theme based on dark mode setting
  const theme = getTheme(darkMode);
  const dispatch: AppDispatch = useDispatch();

  // Dispatch action to check authentication status when component mounts
  useEffect(() => {
    dispatch(checkStatus());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          <Routes>
            <Route element={<ProtectRoute />}>
              <Route path="/" element={<Movies />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
