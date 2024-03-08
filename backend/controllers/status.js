// Internal modules
const User = require("../models/User");
const config = require("../utils/config");

const express = require("express");
const router = express.Router();

// Add logout route
router.post(config.ROUTE.logout, (req, res) => {
    req.session.destroy(() => {
        res.json({
            isLoggedIn: false,
            user: null
        });
    });
}); 

// Add authentication check route
router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            isLoggedIn: true,
            user: req.user // Send user information back to the client
        });
    } else {
        res.json({ isLoggedIn: false });
    }
});

module.exports = router;
