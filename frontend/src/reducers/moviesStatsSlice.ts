import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { MOVIES_BUDGET_URL, MOVIES_RELEASE_URL } from "../services/config";

interface ReleasePerYear {
  _id: number;
  numberOfReleases: number;
}
interface ProductionBudget {
  _id: number;
  averageBudgetMillions: number;
}
type Status = "idle" | "loading" | "succeeded" | "failed";

interface MoviesStats {
  releaseChartData: {
    datasets: {
      label: string;
      data: { x: number; y: number }[];
      backgroundColor: string;
    }[];
  };
  budgetChartData: {
    labels: ProductionBudget["_id"][];
    datasets: {
      label: string;
      data: ProductionBudget["averageBudgetMillions"][];
      backgroundColor: string;
    }[];
  };

  releaseChartDataStatus: Status;
  budgetChartDataStatus: Status;

  releaseChartDataError: null | unknown;
  budgetChartDataError: null | unknown;
}

const initialState: MoviesStats = {
  budgetChartData: {
    labels: [],
    datasets: [
      {
        label: "Average Budget (Millions)",
        data: [],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  },
  releaseChartData: {
    datasets: [
      {
        label: "Number of Releases Per Year",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  },
  budgetChartDataStatus: "idle",
  releaseChartDataStatus: "idle",
  budgetChartDataError: null,
  releaseChartDataError: null,
};

export const fetchAverageBudgetPerYear = createAsyncThunk(
  "movies/averageBudget",
  async () => {
    // Making an API request to fetch movies based on page and search term
    const response = await axios.get(MOVIES_BUDGET_URL);
    return response.data as ProductionBudget[]; // Returning the data from the response
  }
);

export const fetchReleasesPerYear = createAsyncThunk(
  "movies/fetchReleasePerYear",
  async () => {
    // Making an API request to fetch movies based on page and search term
    const response = await axios.get(MOVIES_RELEASE_URL);
    return response.data as ReleasePerYear[]; // Returning the data from the response
  }
);

const moviesStatsSlice = createSlice({
  name: "moviesStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAverageBudgetPerYear.pending, (state) => {
        state.budgetChartDataStatus = "loading";
      })
      .addCase(fetchAverageBudgetPerYear.fulfilled, (state, action) => {
        state.budgetChartDataStatus = "succeeded";
        const labels = action.payload.map((item) => item._id);
        const budgetData = action.payload.map(
          (item) => item.averageBudgetMillions
        );
        state.budgetChartData.labels = labels;
        state.budgetChartData.datasets = [
          {
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            data: budgetData,
            label: "Average Budget (Millions)",
          },
        ];
      })
      .addCase(fetchAverageBudgetPerYear.rejected, (state, action) => {
        state.budgetChartDataStatus = "failed";
        state.budgetChartDataError = action.error.message;
      })
      // Handling the new fetchReleasesPerYear action
      .addCase(fetchReleasesPerYear.pending, (state) => {
        state.releaseChartDataStatus = "loading";
      })
      .addCase(fetchReleasesPerYear.fulfilled, (state, action) => {
        state.releaseChartDataStatus = "succeeded";
        const formattedData = action.payload.map((item) => ({
          x: item._id,
          y: item.numberOfReleases,
        }));
        state.releaseChartData.datasets = [
          {
            label: "Number of Releases Per Year",
            backgroundColor: "rgba(255, 99, 132, 1)",
            data: formattedData,
          },
        ];
      })
      .addCase(fetchReleasesPerYear.rejected, (state, action) => {
        state.releaseChartDataStatus = "failed";
        state.releaseChartDataError = action.error.message;
      });
  },
});

// export const {  } = moviesStatsSlice.actions;
export default moviesStatsSlice.reducer;
