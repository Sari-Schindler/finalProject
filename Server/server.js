// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const yahooFinance = require('yahoo-finance2').default;

// const app = express();
// const port = 3000;

// // Use CORS middleware
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// app.post('/fetchData', async (req, res) => {
//   const { stockSymbol, startDate, endDate } = req.body;
//   try {
//     const queryOptions = { period1: startDate, period2: endDate, interval: '1d' };
//     const result = await yahooFinance.historical(stockSymbol, queryOptions);
//     res.json(result);
//   } catch (error) {
//     console.error("Error fetching data from Yahoo Finance:", error);
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });




// const https = require('https');
// // const yahooFinance = require('yahoo-finance2').default;
// const Portfolio = require('./Portfolio');
// https.globalAgent.options.rejectUnauthorized = false;

// const myPortfolio = new Portfolio(new Date(), 10000);

// async function runPortfolioExample() {
//     try {
//         await myPortfolio.buyStock('AAPL', 10);

//         const portfolio = myPortfolio.getPortfolio();
//         console.log('Current Portfolio:', portfolio);

//     }
//     catch (error) {
//         console.error('Error in portfolio operations:', error);
//     }
// }

// runPortfolioExample();