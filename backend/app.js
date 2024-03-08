// Third-party modules
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

// Internal utility modules
const connectDB = require("./utils/database");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const { CORS_OPTIONS } = require("./utils/config");

// Router modules
const googleAuthRouter = require("./controllers/googleAuth");
const githubAuthRouter = require("./controllers/githubAuth");
const statusRouter = require("./controllers/status");
const movieRouter = require("./controllers/movies");

// Initialize Express application
const app = express();

// Database connection
connectDB();

// Session configuration
app.use(
  session({
    secret: config.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if you're using HTTPS
  })
);

// Application middleware
app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(passport.initialize());
app.use(passport.session());
app.use(middleware.logger);

// Application routes using the ROUTE object from config.js
app.use(config.ROUTE.googleRoute, googleAuthRouter);
app.use(config.ROUTE.githubRoute, githubAuthRouter);
app.use(config.ROUTE.status, statusRouter);
app.use(config.ROUTE.movies, movieRouter);

// Export the configured Express application
module.exports = app;
