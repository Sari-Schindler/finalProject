import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Router from './Components/Router'

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
// import { fetchStockData } from './fetchStockData';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

 function App() {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       const data = await fetchStockData('AAPL', '2022-01-01', '2023-01-01');
//       setChartData(data);
//     };

//     getData();
//   }, []);

  return (
       <Router />
  );
}

export default App;
