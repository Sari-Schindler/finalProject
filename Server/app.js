<<<<<<< HEAD
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
=======
const https = require('https');
const yahooFinance = require('yahoo-finance2').default;
const Portfolio = require('./Portfolio');
https.globalAgent.options.rejectUnauthorized = false;

const myPortfolio = new Portfolio(new Date(), 10000);

async function runPortfolioExample() {
    try {
        await myPortfolio.buyStock('AAPL', 10);

        const portfolio = myPortfolio.getPortfolio();
        console.log('Current Portfolio:', portfolio);

    }
    catch (error) {
        console.error('Error in portfolio operations:', error);
    }
}

runPortfolioExample();




















// async function sleep(ms) {
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=> {resolve()}, ms);
//     });
// }
//
//
//
// async function aaa() {
//     const results = await yahooFinance.historical('AAPL', { period1: '2021-02-01', period2: '2021-02-10' })
//     // await sleep(500);
//     console.log('done', results[0].open);
// }
//
// aaa();
>>>>>>> 9b224974950a2a6db462e151335c8d6dce054a32
