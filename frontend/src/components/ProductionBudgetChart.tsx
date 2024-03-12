// React hooks for side effects
import { useEffect } from "react";

// Redux hooks for dispatching actions and accessing state
import { useDispatch, useSelector } from "react-redux";

// Chart.js components for building charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// React wrapper for Chart.js
import { Bar } from "react-chartjs-2";

// Types and actions from the local Redux store
import { AppDispatch, RootState } from "../main";
import { fetchAverageBudgetPerYear } from "../reducers/moviesStatsSlice";

// Registration of Chart.js components required for building bar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// BudgetBarChart component displays a bar chart visualizing average movie production budgets.
export default function BudgetBarChart() {
  // Hook to dispatch actions to the Redux store.
  const dispatch: AppDispatch = useDispatch();
  // Retrieves budget chart data from Redux store.

  const { budgetChartData } = useSelector(
    (state: RootState) => state.moviesStats
  );

  // Effect hook to fetch average budget per year when component mounts.
  useEffect(() => {
    dispatch(fetchAverageBudgetPerYear());
  }, [dispatch]);

  // Renders a bar chart using Chart.js with specified options and data.
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Average Production Budget per Year (in Millions)",
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