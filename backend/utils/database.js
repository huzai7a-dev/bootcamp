// database.js
const mongoose = require("mongoose");
const config = require("../utils/config");

/**
 * Establishes connection to MongoDB using Mongoose.
 * Exits the application on failure to connect to the database.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit application with failure signal
  }
};

module.exports = connectDB;