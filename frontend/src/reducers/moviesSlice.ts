// Importing necessary dependencies and initial state setup
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // For making API requests
import { MOVIES_URL } from "../services/config"; // Base URL for movie data

export interface Movie {
  _id: string;
  "Release Date": string; // Assuming dates come as strings
  "Movie Title": string;
  "Production Budget": number;
  "Domestic Gross": number;
  "Worldwide Gross": number;
}

// Defining the structure for our movie state
interface MovieState {
  movies: Movie[]; // Array to store movie objects
  totalPages: number; // Total number of pages for pagination
  currentPage: number; // Current page in the pagination
  orderBy: keyof Omit<Movie, "_id"> | null;
  filter?: {
    minBudget: number;
    maxBudget: number;
    startDate: string;
    endDate: string;
  } | null;
  search: string; // Search term for filtering movies
  status: "idle" | "loading" | "succeeded" | "failed"; // Load status
  error: string | null; // Error message,
}

// Initial state for the movie slice
const initialState: MovieState = {
  movies: [],
  totalPages: 0,
  currentPage: 1,
  orderBy: null,
  filter: null,
  search: "",
  status: "idle",
  error: null,
};

// Asynchronous thunk for fetching movies from the API
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({
    page,
    search,
    filter,
    orderBy,
  }: {
    page: number;
    search: string;
    orderBy?: MovieState["orderBy"];
    filter?: MovieState["filter"];
  }) => {
    // Start with the base URL
    let url = `${MOVIES_URL}?page=${page}&search=${encodeURIComponent(search)}`;

    // Add optional parameters if they exist
    if (orderBy) {
      url += `&orderBy=${encodeURIComponent(orderBy)}`;
    }
    if (filter?.startDate) {
      url += `&startDate=${encodeURIComponent(filter.startDate)}`;
    }
    if (filter?.endDate) {
      url += `&endDate=${encodeURIComponent(filter.endDate)}`;
    }
    if (filter?.minBudget !== undefined) {
      // Check specifically for undefined since 0 is a valid budget
      url += `&minBudget=${filter.minBudget}`;
    }
    if (filter?.maxBudget !== undefined) {
      // Same as above
      url += `&maxBudget=${filter.maxBudget}`;
    }

    // Making an API request to fetch movies
    const response = await axios.get(url);
    return response.data; // Returning the data from the response
  } // Returning the data from the response
);

// Slice for managing movie-related data and actions
const moviesSlice = createSlice({
  name: "movies", // Name of the slice
  initialState, // Initial state for the slice
  reducers: {
    // Reducer to set the current page
    setOrderBy(state, action) {
      state.orderBy = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    // Reducer to set the search term
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers(builder) {
    // Handling different states of the fetchMovies async thunk
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading"; // Mark as loading when the request is made
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded"; // Mark as succeeded upon successful response
        // Update state with fetched movies data
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed"; // Mark as failed if the request fails
        state.error = action.error.message || null; // Store error message
      });
  },
});

// Exporting the reducer actions and the reducer itself for store configuration
export const { setPage, setSearch, setOrderBy, setFilter } =
  moviesSlice.actions;
export default moviesSlice.reducer;