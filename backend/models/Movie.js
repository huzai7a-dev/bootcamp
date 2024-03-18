// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for the Movie model
const movieSchema = new mongoose.Schema({
  "Release Date": {
    type: Date,
    required: true,
  },
  "Movie Title": {
    type: String,
    required: true,
  },
  "Production Budget": {
    type: Number,
    required: true,
  },
  "Domestic Gross": {
    type: Number,
    required: true,
  },
  "Worldwide Gross": {
    type: Number,
    required: true,
  },
});

// Define the schema for the Movie model
const Movie = mongoose.model("Movie", movieSchema);

// Export the Movie model so it can be used in other parts of the application
module.exports = Movie;
