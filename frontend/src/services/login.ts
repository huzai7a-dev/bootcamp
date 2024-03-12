// Importing the OAuth URL from the configuration file
import { AUTH_URL } from "./config";

// Function to redirect the user to OAuth login page for the specified provider
const redirectToOAuthLogin = (provider: "google" | "github") => {
  // Constructing the backend OAuth URL with the provider and return URL
  const backendOAuthURL = `${AUTH_URL}/${provider}?returnTo=${encodeURIComponent(
    window.location.href
  )}`;
  // Redirecting the user to the constructed OAuth URL
  window.location.href = backendOAuthURL;
};

// Exporting the redirectToOAuthLogin function
export default { redirectToOAuthLogin };
