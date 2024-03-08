// React-related imports
import React from 'react';

//constant from config file
import { BACKEND_URL } from '../services/config';

// MUI (Material-UI) component imports
import { Button, Card, CardContent, Typography, Box, useTheme, useMediaQuery } from '@mui/material';

// MUI Icons imports
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

const LoginPage: React.FC = () => {
  // Handler for initiating OAuth login process
  const handleOAuthLogin = (provider: 'google' | 'github') => {
    // Constructing backend URL for OAuth
    const backendUrl = `${BACKEND_URL}/auth/${provider}`;
    // Redirecting to the backend URL for OAuth flow
    window.location.href = backendUrl;
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  // Component render JSX
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ece9e6, #ffffff)', // Added a gradient background
      }}
    >
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 450,
          boxShadow: 3, // Adjusted shadow depth for subtlety
          borderRadius: '20px', // More pronounced rounded corners
          p: matches ? 5 : 3, // Adjust padding based on screen size
          backgroundColor: 'rgba(255,255,255,0.85)', // Slightly transparent background for depth
          backdropFilter: 'blur(10px)', // Blur effect for background content
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            textAlign="center"
            color="primary"
            sx={{ fontWeight: 'bold', mb: 3 }} // Adjusted for emphasis
          >
            Welcome to OAuth App
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            textAlign="center"
            sx={{ mb: 4 }} // Adjusted margin
          >
            Please select your preferred login method:
          </Typography>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={() => handleOAuthLogin('google')}
            sx={{
              mb: 2, // Adjusted margin
              width: '100%',
              maxWidth: '300px',
              height: '50px',
              backgroundColor: '#EA4335', // Google button background color
              '&:hover': { backgroundColor: '#D93425' }, // Google button hover color
              fontWeight: 'bold', // Make text bold
            }}
          >
            Sign in with Google
          </Button>
          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            onClick={() => handleOAuthLogin('github')}
            sx={{
              width: '100%',
              maxWidth: '300px',
              height: '50px',
              backgroundColor: '#24292E', // GitHub button background color
              '&:hover': { backgroundColor: '#1B1F23' }, // GitHub button hover color
              fontWeight: 'bold', // Make text bold
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
