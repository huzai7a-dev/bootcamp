import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, LinearScale, PointElement, Title } from 'chart.js';

ChartJS.register(Tooltip, Legend, LinearScale, PointElement, Title);

const options = {
  scales: {
    x: {
      type: 'linear',
      position: 'bottom'
    }
  },
  plugins: {
    title: {
      display: true,
      text: 'Number of Releases Per Year'
    }
  }
};

export default function ReleasesPerYearChart() {
  const [data, setData] = useState({
    datasets: [
      {
        label: 'Number of Releases',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 1)',
      }
    ],
  });

  useEffect(() => {
    fetch('http://localhost:3000/movies/releases-per-year')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => ({
          x: item._id,
          y: item.numberOfReleases
        }));
        setData({
          datasets: [
            {
              ...data.datasets[0],
              data: formattedData
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return <Scatter options={options} data={data} />;
}
