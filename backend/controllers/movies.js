const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Route to fetch movies with pagination and optional search
router.get("/", async (req, res) => {
  // Extract query parameters
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    // Convert page and limit to numbers for the query
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Calculate the number of documents to skip
    const skip = (pageNum - 1) * limitNum;

    // Build the query for searching by movie title
    // Adjust the search fields as necessary
    const searchQuery = search
      ? { "Movie Title": { $regex: search, $options: "i" } } // Case-insensitive regex search
      : {};
    // Fetch movies from the database with pagination and search
    const movies = await Movie.find(searchQuery).skip(skip).limit(limitNum);

    // Get the total count of documents matching the search query (for pagination)
    const totalCount = await Movie.countDocuments(searchQuery);

    // Send back the movies and total count (for frontend pagination)
    res.json({
      movies,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      totalCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
