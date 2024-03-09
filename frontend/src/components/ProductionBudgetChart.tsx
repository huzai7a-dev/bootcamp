import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Paper, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Average Production Budget per Year (in Millions)',
    },
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export default function BudgetBarChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Average Budget (Millions)',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/movies/average-budget-per-year');
      const data = await response.json();
      const labels = data.map(item => item._id);
      const budgetData = data.map(item => item.averageBudgetMillions);

      setChartData({
        labels: labels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: budgetData,
          },
        ],
      });
    };

    fetchData();
  }, [chartData.datasets]);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Average Production Budget per Year (in Millions)
      </Typography>
      <Bar options={options} data={chartData} />
    </Paper>
  );
}
