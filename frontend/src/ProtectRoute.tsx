// Import necessary hooks and components from React Router
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// Import RootState type from the root component
import { RootState } from "./App";

// Import useSelector hook from React Redux
import { useSelector } from "react-redux";

// Import useEffect hook from React
import { useEffect } from "react";

// Define a functional component for protecting routes
const ProtectRoute = () => {
  // Initialize hooks for navigation and location
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Extract isLoggedIn state from the Redux store
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // Effect hook to check authentication status and redirect accordingly
  useEffect(() => {
    // Redirect to home page if logged in user tries to access login page
    if (isLoggedIn && pathname === "/login") {
      navigate("/");
    }
    // Redirect to login page if user tries to access other routes without logging in
    if (!isLoggedIn && pathname !== "/login") {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, pathname]);

  // Render the nested routes
  return <Outlet />;
};

// Export the ProtectRoute component
export default ProtectRoute;
