import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MOVIES_URL } from "../services/config";

interface MovieData {
  releaseDate: Date | null;
  movieTitle: string;
  productionBudget: number | "";
  domesticGross: number | "";
  worldwideGross: number | "";
}

interface MovieState {
  loading: boolean;
  error: string | null;
}

export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (movieData: MovieData) => {
    const response = await axios.post(MOVIES_URL, movieData);
    return response.data;
  }
);

const initialState: MovieState = {
  loading: false,
  error: null,
};

const createMovieSlice = createSlice({
  name: "createMovie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to create movie";
      });
  },
});

export default createMovieSlice.reducer;
