// React imports
import React from "react";

// Import URL configuration
import { AUTH_URL } from "../services/config";

// Material UI imports for UI elements and theming
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";

// Material UI icons imports
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

// LoginPage component: provides login functionality through OAuth providers.
const LoginPage: React.FC = () => {
  // handleOAuthLogin: Redirects the user to OAuth login URL based on the provider.
  const handleOAuthLogin = (provider: "google" | "github") => {
    // Construct the backend URL for authentication.
    const backendUrl = `${AUTH_URL}${provider}`;
    // Redirect the user to the backend URL for OAuth authentication.
    window.location.href = backendUrl;
  };

  // Theme hook for responsive design settings.
  const theme = useTheme();

  // Media query hook to check for 'medium' or higher screen size.
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #4776e6, #8e54e9)",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing(4),
            color: "#FFFFFF",
          }}
        >
          <Box sx={{ maxWidth: 400, textAlign: isUpMd ? "left" : "center" }}>
            <Typography variant="h4" gutterBottom>
              Simplify Your Sign-in
            </Typography>
            <Typography>
              Use your Google or GitHub account to get started instantly.
            </Typography>
          </Box>
        </Grid>

        {/* Form Side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              minWidth: 275,
              maxWidth: 400,
              boxShadow: theme.shadows[3],
              borderRadius: "20px",
              p: 3,
              backgroundColor: "rgba(255, 255, 255, 0.75)", // Semi-transparent white
              backdropFilter: "blur(10px)", // Blur effect for the glass look
              border: "1px solid rgba(255, 255, 255, 0.2)",
              margin: theme.spacing(2),
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                color="primary"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Welcome to OAuth App
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Please select your preferred login method:
              </Typography>
              {/* Enhanced Button Styles */}
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={() => handleOAuthLogin("google")}
                sx={{
                  mb: 2,
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#EA4335",
                  "&:hover": { backgroundColor: "#D93425" },
                  fontWeight: "bold",
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
                  height: "50px",
                  backgroundColor: "#24292E",
                  "&:hover": { backgroundColor: "#1B1F23" },
                  fontWeight: "bold",
                }}
              >
                Sign in with GitHub
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
