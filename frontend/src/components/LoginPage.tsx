// React-related imports
import React from "react";

//constant from config file
import { BASE_URL } from "../services/config";

// MUI (Material-UI) component imports
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

// MUI Icons imports
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

// LoginPage component using React Functional Component
const LoginPage: React.FC = () => {
  // Handler for initiating OAuth login process
  const handleOAuthLogin = (provider: "google" | "github") => {
    // Constructing backend URL for OAuth
    const backendUrl = `${BASE_URL}/auth/${provider}`;
    // Redirecting to the backend URL for OAuth flow
    window.location.href = backendUrl;
  };

  // Component render JSX
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "80vh",
        paddingTop: "10vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "& > *": { mb: 5 }, // Margin bottom for all child elements
      }}
    >
      <Card
        sx={{
          minWidth: 350,
          maxWidth: 450,
          mt: 8, // Margin top
          boxShadow: 4, // Shadow depth
          borderRadius: "16px", // Border radius for rounded corners
          paddingTop: 6, // Padding top
          paddingBottom: 6, // Padding bottom
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "&:last-child": { paddingBottom: 3 }, // Padding bottom for the last child
          }}
        >
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            textAlign="center"
            color="primary"
            sx={{ mb: 3 }} // Margin bottom
          >
            Welcome to OAuth App Xgrid
          </Typography>
          <Typography
            variant="caption"
            component="div"
            gutterBottom
            textAlign="center"
            sx={{ mb: 4 }} // Margin bottom
          >
            Please select your preferred login method:
          </Typography>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={() => handleOAuthLogin("google")}
            sx={{
              mb: 3, // Margin bottom
              width: "100%",
              maxWidth: "300px",
              height: "50px",
              backgroundColor: "#EA4335", // Google button background color
              "&:hover": { backgroundColor: "#D93425" }, // Google button hover color
            }}
          >
            Sign in with Google
          </Button>
          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            onClick={() => handleOAuthLogin("github")}
            sx={{
              width: "100%",
              maxWidth: "300px",
              height: "50px",
              backgroundColor: "#24292E", // GitHub button background color
              "&:hover": { backgroundColor: "#1B1F23" }, // GitHub button hover color
            }}
          >
            Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

// Default export of LoginPage component
export default LoginPage;