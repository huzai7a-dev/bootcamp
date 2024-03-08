require("dotenv").config(); // Load environment variables

//frontEnd URL
const frontEndUrl = 'http://localhost:5173';
// Application and database configuration
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// OAuth credentials
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// OAuth callback URLs
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

// Session key for cookie
const COOKIE_KEY = process.env.COOKIE_KEY;

// Application routes
const ROUTE = {
  googleRoute: "/auth/google",
  githubRoute: "/auth/github",
  callback: "/callback",
  login: "/login",
  profile: "/profile",
  status: "/status",
  logout: "/logout",
  movies: "/movies",
};

// cors options
const CORS_OPTIONS = {
  origin: process.env.ORIGIN,
  credentials: true,
}

module.exports = {
  PORT,
  MONGO_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  COOKIE_KEY,
  GOOGLE_CALLBACK_URL,
  GITHUB_CALLBACK_URL,
  ROUTE,
  CORS_OPTIONS
};