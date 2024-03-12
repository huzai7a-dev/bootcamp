const mongoose = require("mongoose");

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

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
