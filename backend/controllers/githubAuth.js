// Third-party modules
const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

// Internal modules
const User = require("../models/User");
const config = require("../utils/config");

// Initialize router
const router = express.Router();

/**
 * GitHub OAuth strategy configuration.
 * Uses the GitHubStrategy with Passport to authenticate users via GitHub.
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: config.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Attempt to find or create the user in the database
        const user = await User.findOrCreate(
          {
            githubId: profile.id, // condition to find the user
          },
          {
            // Data to create if the user is not found
            githubId: profile.id,
            displayName: profile.displayName || profile.username,
            username: profile.username,
            email: profile.emails?.[0]?.value, // Safely access emails array
            image: profile.photos?.[0]?.value, // Safely access photos array
          }
        );
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

/**
 * Serialization of the user into the session.
 * Determines which data of the user object should be stored in the session.
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Deserialization of the user from the session.
 * The callback fetches the user with the ID stored in the session.
 */
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

/**
 * Route to start GitHub authentication process.
 * Redirects users to GitHub for authentication.
 */
router.get("/", passport.authenticate("github", { scope: ["user:email"] }));

/**
 * GitHub authentication callback route.
 * Handles the redirection after GitHub has authenticated the user.
 */
router.get(
  config.ROUTE.callback,
  passport.authenticate("github", { failureRedirect: config.ROUTE.login }),
  (req, res) => {
    // console.log(res,'github response')
    // Redirects to the profile page upon successful authentication
    res.redirect('http://localhost:5173/');
  }
);

// Export the router
module.exports = router;