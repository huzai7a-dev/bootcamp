// Redux toolkit imports for creating slices and async thunk
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Import URL for movie creation
import { MOVIES_URL } from "../services/config";

// Interface representing the data structure of a movie
interface MovieData {
  releaseDate: Date | null;
  movieTitle: string;
  productionBudget: number | "";
  domesticGross: number | "";
  worldwideGross: number | "";
}

// Interface representing the state of movie creation
interface MovieState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Async thunk function to create a movie
export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (movieData: MovieData) => {
    const response = await axios.post(MOVIES_URL, movieData);
    return response.data;
  }
);

// Initial state for the create movie slice
const initialState: MovieState = {
  loading: false,
  error: null,
  success: false,
};

// Create a slice for handling movie creation
const createMovieSlice = createSlice({
  name: "createMovie",
  initialState,
  reducers: {
    // Reducer function to update the success state based on action payload
    setMovieSuccess(state, action) {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Define how the state should change in response to createMovie async thunk
    builder
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create movie";
      });
  },
});

// Export the reducer function for the create movie slice
export default createMovieSlice.reducer;

// Export any actions defined in the create movie slice
export const { setMovieSuccess } = createMovieSlice.actions;
