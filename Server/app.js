const https = require('https');
const yahooFinance = require('yahoo-finance2').default;
const Portfolio = require('./Portfolio');
const Strategy = require('./strategy');
const RangesExecutor = require('./rangesExecutor');
//const stocksData = require('./stocksDataForTest.json');
//const stocksData = require('./test.json');

const stocksData = require('./stocksHistoricalData.json');
//const executionResultsJson = require('./executionResults.json');
const fs = require('fs');
const path = require('path');





https.globalAgent.options.rejectUnauthorized = false;

//const myPortfolio = new Portfolio(new Date(), 20000);

// function runPortfolioExample(stockSymbol, quantity) {
//
//     myPortfolio.buyStock(stockSymbol, quantity);
//
//     const portfolio = myPortfolio.getPortfolio();
//     console.log('Current Portfolio:', portfolio);
//
//
// }

// class BuyAndHoldStrategy extends Strategy {
//     constructor(stockSymbol, quantity) {
//         super(stockSymbol, quantity);
//     }
//
//     firstDayActions() {
//         console.log(`Buying ${this.quantity} shares of ${this.stockSymbol} on the first day.`);
//         this.portfolio.buyStock();
//     }
//
//     dayActions() {}
// }

class BuyEachMonthStrategy extends Strategy {
    constructor(stockSymbol, quantity, months) {
        super(stockSymbol, quantity, months);
    }

    firstDayActions() {
        console.log(`Buying ${this.quantity} shares of ${this.stockSymbol} on the first day.`);
        //this.portfolio.buyStocksByDollars();
    }

    dayActions() {
        let date = this.portfolio.convertStringToDate(this.portfolio.currentDate);
        if(this.portfolio.isFirstDayOfMonth()){
            //console.log("start new month----------------------------------------------------------------")
            this.portfolio.buyStocksByDollars(100);
        }
    }
}


const myStrategy = new BuyEachMonthStrategy('SPY', 1, 60);
const myRangesExecutor = new RangesExecutor(stocksData, myStrategy, 1000000, 100);
//myRangesExecutor.setPortfolio()
const executionResults = myRangesExecutor.allRangesExecution();
//executionResultsJson = executionResults;
console.log("execution results:", executionResults);
fs.writeFile ("./executionResults.json", JSON.stringify(executionResults), function(err) {
    if (err) throw err;
    console.log('complete');
})



//myPortfolio.setStrategy(myStrategy);
//myPortfolio.allRangesExecution();
//const result = myPortfolio.runOnEachDay(runPortfolioExample, 'QQQ', 1, 1);

// const myStrategy = new BuyAndHoldStrategy('SPY', 1);
// myPortfolio.setStrategy(myStrategy);
// myPortfolio.runOnEachDay();


// const result = myPortfolio.getPortfolio();
// console.log('Final Portfolio:', result);
// console.log('Final Portfolio Value:', myPortfolio.getPortfolioValue());

