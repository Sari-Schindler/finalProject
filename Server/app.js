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