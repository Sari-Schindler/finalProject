//import yahooFinance from 'yahoo-finance2';
const  Portfolio  = require('./services/portfolio.js'); // Use named import
const fs = require("fs");
const Strategy = require('./services/strategy.js');
const RangesExecutor = require('./services/rangesExecutor.js');
const  path = require("path");
const stocksData = require('./data/stocksHistoricalData.json');


async function example(){
    
//https.globalAgent.options.rejectUnauthorized = false;


class BuyEachMonthStrategy extends Strategy {
    constructor(stockSymbol, quantity, months) {
        super(stockSymbol, quantity, months);
    }

    firstDayActions() {
        console.log(`Buying ${this.quantity} shares of ${this.stockSymbol} on the first day.`);
    }

    dayActions() {
        let date = this.portfolio.convertStringToDate(this.portfolio.currentDate);
        if (this.portfolio.isFirstDayOfMonth()) {
            this.portfolio.buyStocksByDollars(100);
        }
    }
}

const myStrategy = new BuyEachMonthStrategy('SPY', 1, 60);
const myRangesExecutor = new RangesExecutor(stocksData, myStrategy, 1000000, 400);
const executionResults = myRangesExecutor.allRangesExecution();

console.log('Execution results:', executionResults);
fs.writeFile('./executionResults.json', JSON.stringify(executionResults), (err) => {
    if (err) throw err;
    console.log('Complete');
});


    
}
example();

module.exports = example;