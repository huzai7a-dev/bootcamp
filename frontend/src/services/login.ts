import { AUTH_URL } from "./config";

const redirectToOAuthLogin = (provider: "google" | "github") => {
  const backendOAuthURL = `${AUTH_URL}/${provider}?returnTo=${encodeURIComponent(
    window.location.href
  )}`;
  window.location.href = backendOAuthURL;
};

export default { redirectToOAuthLogin };
