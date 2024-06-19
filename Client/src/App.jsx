import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Router from './Components/Router'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     </>
//   )
// }

// export default App

// src/App.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchStockData } from './fetchStockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchStockData('AAPL', '2022-01-01', '2023-01-01');
      setChartData(data);
    };

    getData();
  }, []);

  return (
    <div className="App">
       <Router />

      <h1>Stock Data Analysis</h1>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
