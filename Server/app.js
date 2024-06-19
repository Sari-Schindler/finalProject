// src/App.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchStockData } from './fetchStockData';

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
