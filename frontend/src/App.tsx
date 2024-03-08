// React-related imports
import React, { useState, useEffect } from "react";

// Routing-related imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Material-UI imports
import { ThemeProvider, CssBaseline } from "@mui/material";

// Redux-related imports
import { useDispatch, useSelector } from "react-redux";
import { checkStatus } from "./reducers/authSlice";

// Theme import
import getTheme from "./services/theme";

// Component imports
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import ProtectRoute from "./ProtectRoute";

// Define the shape of your state, adjust according to your state structure
export interface RootState {
  auth: {
    isLoggedIn: boolean;
    user: {
      _id: string;
      displayName: string;
      // Add other user fields as needed
    } | null;
  };
  // Add other state slices as needed
}

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkmode");
    return savedMode?.toLowerCase() === "true";
  });

  const theme = getTheme(darkMode);
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkStatus() as any);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Pass isLoggedIn state to the Header component */}
        {authState.isLoggedIn &&
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        }
        <Routes>
          <Route element={<ProtectRoute/>}>
            <Route path="/" element={<Profile />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;