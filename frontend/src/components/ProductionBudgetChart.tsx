import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { AppDispatch, RootState } from "../main";
import { fetchAverageBudgetPerYear } from "../reducers/moviesStatsSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BudgetBarChart() {
  const dispatch: AppDispatch = useDispatch();

  const { budgetChartData } = useSelector(
    (state: RootState) => state.moviesStats
  );

  useEffect(() => {
    dispatch(fetchAverageBudgetPerYear());
  }, [dispatch]);

  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
      data={budgetChartData}
    />
  );
}