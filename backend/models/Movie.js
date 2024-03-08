const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  releaseDate: {
    type: Date,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  productionBudget: {
    type: Number,
    required: true,
  },
  domesticGross: {
    type: Number,
    required: true,
  },
  worldwideGross: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
