// React hooks for lifecycle management.
import { useEffect } from "react";

// react-chartjs-2 component for rendering scatter charts.
import { Scatter } from "react-chartjs-2";

// Chart.js modules for chart functionality and customization.
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";

// Redux hooks for dispatching actions and accessing the state.
import { useDispatch, useSelector } from "react-redux";

// Project-specific types and Redux operations.
import { fetchReleasesPerYear } from "../reducers/moviesStatsSlice";
import { AppDispatch, RootState } from "../main";

// Chart.js registration for required components.
ChartJS.register(Tooltip, Legend, LinearScale, PointElement, Title);

// ReleasesPerYearChart functional component for displaying the scatter chart of movie releases per year.
export default function ReleasesPerYearChart() {
  // Dispatch function from Redux for dispatching actions.
  const dispatch: AppDispatch = useDispatch();
  // Accessing the releaseChartData from the Redux store.
  const { releaseChartData } = useSelector(
    (state: RootState) => state.moviesStats
  );

  // Fetch data on component mount.
  useEffect(() => {
    dispatch(fetchReleasesPerYear());
  }, [dispatch]);

  // Scatter chart configuration and rendering.
  return (
    <Scatter
      options={{
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Releases",
            },
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Number of Releases Per Year",
          },
          legend: {
            display: false,
          },
        },
      }}
      data={releaseChartData}
    />
  );
}
