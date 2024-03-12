const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

function convertISOToSimpleDate(isoDateStr) {
  const date = new Date(isoDateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}/${year}`;
}
router.get("/", async (req, res) => {
  const { page = 1, limit = 10, search = "", orderBy, startDate, endDate, minBudget, maxBudget } = req.query;

  try {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    let searchQuery = search ? { "Movie Title": { $regex: search, $options: "i" } } : {};
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

    let sortQuery = {};
    if (orderBy) {
      sortQuery[orderBy] = -1;
    }
    
    const movies = await Movie.find(searchQuery)
      .skip(skip)
      .limit(limitNum)
      .sort(sortQuery)

    const totalCount = await Movie.countDocuments(searchQuery);

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

router.post('/', async (req, res) => {
  try {
    const { releaseDate, movieTitle, productionBudget, domesticGross, worldwideGross } = req.body;
    const newMovie = new Movie({ "Release Date": releaseDate, "Movie Title": movieTitle, "Production Budget": Number(productionBudget) || 0, "Domestic Gross": Number(domesticGross), "Worldwide Gross": Number(worldwideGross) });
    await newMovie.save();
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create movie', error: error.message });
  }
});

module.exports = router;
