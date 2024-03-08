// Third-party modules
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Internal modules
const User = require("../models/User");
const config = require("../utils/config");

// Initialize router
const router = express.Router();

/**
 * Google OAuth strategy configuration.
 * Utilizes Passport's GoogleStrategy for authenticating users via Google.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Attempt to find or create the user based on the Google ID
        const user = await User.findOrCreate(
          {
            googleId: profile.id, // Condition to find the user
          },
          {
            // Data to create if the user doesn't exist
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails?.[0]?.value, // Safely access the first email
            image: profile.photos?.[0]?.value, // Safely access the first photo
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
 * Fetches the user with the ID stored in the session to maintain login state.
 */
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

/**
 * Route to start Google authentication process.
 * Redirects users to Google for authentication.
 */
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * Google authentication callback route.
 * Handles the redirection after Google has authenticated the user.
 */
router.get(
  config.ROUTE.callback,
  passport.authenticate("google", { failureRedirect: config.ROUTE.login }),
  (req, res) => {
    // Redirects to the profile page upon successful authentication
    res.redirect('http://localhost:5173/');
  }
);

// Export the router
module.exports = router;