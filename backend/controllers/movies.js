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

router.get('/average-budget-per-year', async (req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          "Release Date": { $ne: "" } // Exclude documents where 'Release Date' is an empty string
        }
      },
      {
        $addFields: {
          convertedDate: { 
            $cond: {
              if: { $ne: ["$Release Date", null] }, // Ensure 'Release Date' is not null
              then: { $toDate: "$Release Date" },
              else: null // Skip conversion if 'Release Date' is null
            }
          }
        }
      },
      {
        $match: {
          convertedDate: { $ne: null }
        }
      },
      {
        $group: {
          _id: { $year: "$convertedDate" },
          averageBudget: { $avg: "$Production Budget" }
        }
      },
      {
        $addFields: {
          averageBudgetMillions: { 
            $divide: ["$averageBudget", 1000000]
          }
        }
      },
      { $sort: { _id: 1 } }
    ];
    

    const result = await Movie.aggregate(pipeline);

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/releases-per-year', async (req, res) => {
  try {

    const pipeline = [
      {
        $match: {
          "Release Date": { $ne: "" } // Ensure 'Release Date' is not empty
        }
      },
      {
        $addFields: {
          "convertedReleaseDate": {
            $toDate: "$Release Date" // Convert 'Release Date' to a date object
          }
        }
      },
      {
        $group: {
          _id: { $year: "$convertedReleaseDate" }, // Group by year
          numberOfReleases: { $sum: 1 } // Count releases per year
        }
      },
      { 
        $sort: { "_id": 1 } // Sort by year
      }
    ];
    
    const result = await Movie.aggregate(pipeline);

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
