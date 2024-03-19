import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { Movie } from "./moviesSlice";
import { MOVIES_METRICS, RECENT_MOVIES } from "../services/config";

interface DashboardMetrics {
  metrics: MovieMetrics | null;
  recentMovies: Movie[] | null;
  status: "idle" | "loading" | "failed";
}

export interface MovieMetrics {
  totalMovies: number;
  averageBudget: number;
  highestGrossingMovie: {
    _id: string;
    "Release Date": string;
    "Movie Title": string;
    "Production Budget": number;
    "Domestic Gross": number;
    "Worldwide Gross": number;
  };
}

export const fetchMovieMetrics = createAsyncThunk("Movie_Metrics", async () => {
  const response = await axios.get<MovieMetrics>(MOVIES_METRICS);
  return response.data;
});

export const fetchRecentMovies = createAsyncThunk("Recent_Movies", async () => {
  const response = await axios.get<Movie[]>(RECENT_MOVIES);
  return response.data;
});

// Initial state
const initialState: DashboardMetrics = {
  metrics: null,
  recentMovies: null,
  status: "idle",
};

const dashboardMetrics = createSlice({
  name: "dashboard_metrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieMetrics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMovieMetrics.fulfilled,
        (state, action: PayloadAction<MovieMetrics>) => {
          state.status = "idle";
          state.metrics = action.payload;
        }
      )
      .addCase(fetchMovieMetrics.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchRecentMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRecentMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.status = "idle";
          state.recentMovies = action.payload;
        }
      )
      .addCase(fetchRecentMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default dashboardMetrics.reducer;
