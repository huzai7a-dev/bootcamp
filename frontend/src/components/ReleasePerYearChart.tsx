import { useEffect } from "react";

import { Scatter } from "react-chartjs-2";

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";

import { useDispatch, useSelector } from "react-redux";

import { fetchReleasesPerYear } from "../reducers/moviesStatsSlice";
import { AppDispatch, RootState } from "../main";

ChartJS.register(Tooltip, Legend, LinearScale, PointElement, Title);

export default function ReleasesPerYearChart() {
  const dispatch: AppDispatch = useDispatch();
  const { releaseChartData } = useSelector(
    (state: RootState) => state.moviesStats
  );

  useEffect(() => {
    dispatch(fetchReleasesPerYear());
  }, [dispatch]);

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
              display: false,
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
