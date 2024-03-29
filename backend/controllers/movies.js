// Import necessary modules
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const config = require("../utils/config");

// Utility function to convert ISO date strings to simple date format (MM/DD/YYYY)
function convertISOToSimpleDate(isoDateStr) {
  const date = new Date(isoDateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
}

// Route to fetch a list of movies based on query parameters
router.get("/", async (req, res) => {
  // Destructure and set default values for query parameters
  const {
    page = 1,
    limit = 10,
    search = "",
    orderBy,
    startDate,
    endDate,
    minBudget,
    maxBudget,
  } = req.query;

  try {
    // Parse page and limit parameters to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Construct the search query based on provided parameters
    let searchQuery = search
      ? { "Movie Title": { $regex: search, $options: "i" } }
      : {};
    if (startDate || endDate) {
      searchQuery["Release Date"] = {};
      if (startDate) {
        searchQuery["Release Date"].$gte = convertISOToSimpleDate(startDate);
      }
      if (endDate) {
        searchQuery["Release Date"].$lte = convertISOToSimpleDate(endDate);
      }
    }

    if (minBudget || maxBudget) {
      searchQuery["Production Budget"] = {};
      if (minBudget) {
        searchQuery["Production Budget"].$gte = parseInt(minBudget, 10);
      }
      if (maxBudget) {
        searchQuery["Production Budget"].$lte = parseInt(maxBudget, 10);
      }
    }

    // Construct the sorting query based on the orderBy parameter
    let sortQuery = {};
    if (orderBy) {
      sortQuery[orderBy] = -1;
    }

    // Execute the query with pagination and sorting
    const movies = await Movie.find(searchQuery)
      .skip(skip)
      .limit(limitNum)
      .sort(sortQuery);
    const totalCount = await Movie.countDocuments(searchQuery);

    // Send the paginated result set
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


router.get(config.ROUTE.keyMetrics, async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const averageBudget = await Movie.aggregate([
      { $group: { _id: null, averageBudget: { $avg: "$Production Budget" } } }
    ]);
    const highestGrossingMovie = await Movie.findOne().sort('-Worldwide Gross').limit(1);
  
    res.send({
      totalMovies,
      averageBudget: averageBudget.length > 0 ? averageBudget[0].averageBudget : 0,
      highestGrossingMovie
    });
  } catch (error) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

router.get(config.ROUTE.recentMovies, async (req, res) => {
  try {
    const recentMovies = await Movie.find().sort('-Release Date').limit(10);
    res.send(recentMovies);

  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error");
  }
});


// Route to get the average movie budget per year
router.get(config.ROUTE.averageBPY, async (req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          "Release Date": { $ne: "" }, // Exclude documents where 'Release Date' is an empty string
        },
      },
      {
        $addFields: {
          convertedDate: {
            $cond: {
              if: { $ne: ["$Release Date", null] }, // Ensure 'Release Date' is not null
              then: { $toDate: "$Release Date" },
              else: null, // Skip conversion if 'Release Date' is null
            },
          },
        },
      },
      {
        $match: {
          convertedDate: { $ne: null },
        },
      },
      {
        $group: {
          _id: { $year: "$convertedDate" },
          averageBudget: { $avg: "$Production Budget" },
        },
      },
      {
        $addFields: {
          averageBudgetMillions: {
            $divide: ["$averageBudget", 1000000],
          },
        },
      },
      { $sort: { _id: 1 } },
    ];

    const result = await Movie.aggregate(pipeline);

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get the number of movie releases per year
router.get(config.ROUTE.releasePY, async (req, res) => {
  try {
    // MongoDB aggregation pipeline for counting releases per year
    const pipeline = [
      {
        $match: {
          "Release Date": { $ne: "" }, // Ensure 'Release Date' is not empty
        },
      },
      {
        $addFields: {
          convertedReleaseDate: {
            $toDate: "$Release Date", // Convert 'Release Date' to a date object
          },
        },
      },
      {
        $group: {
          _id: { $year: "$convertedReleaseDate" }, // Group by year
          numberOfReleases: { $sum: 1 }, // Count releases per year
        },
      },
      {
        $sort: { _id: 1 }, // Sort by year
      },
    ];

    const result = await Movie.aggregate(pipeline);

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

// Route to create a new movie entry
router.post("/", async (req, res) => {
  try {
    // Extract movie details from request body
    const {
      releaseDate,
      movieTitle,
      productionBudget,
      domesticGross,
      worldwideGross,
    } = req.body;
    // Create a new movie document
    const newMovie = new Movie({
      "Release Date": releaseDate,
      "Movie Title": movieTitle,
      "Production Budget": Number(productionBudget) || 0,
      "Domestic Gross": Number(domesticGross),
      "Worldwide Gross": Number(worldwideGross),
    });
    await newMovie.save();
    res
      .status(201)
      .json({ message: "Movie created successfully", movie: newMovie });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create movie", error: error.message });
  }
});

module.exports = router;
