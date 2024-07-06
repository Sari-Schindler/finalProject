const  Portfolio  = require('./services/portfolio.js'); // Use named import
const fs = require("fs");
const Strategy = require('./services/strategy.js');
const RangesExecutor = require('./services/rangesExecutor.js');
const  path = require("path");
const stocksData = require('./data/stocksHistoricalData.json');

class SpyDropStrategy extends Strategy {
    constructor() {
        super('SPY', 10);
    }
    firstDayActions() {
        console.log("Monitoring ", this.stockSymbol, "for significant price changes.");
    }
    dayActions() {
        const stockPrice = this.portfolio.checkStockPrice();
        const previousDayPrice = this.portfolio.stocksData[this.portfolio.index - 1][this.stockSymbol];
        if (previousDayPrice && stockPrice <= previousDayPrice * 0.97 && this.portfolio.stocks === 0) {
            this.portfolio.buyStocksByDollars(stockPrice * this.quantity);
        }
        if (this.portfolio.stocks > 0 && stockPrice >= previousDayPrice * 1.05) {
            this.portfolio.sellAll();
            console.log("Sold all shares of ", this.stockSymbol," at ",stockPrice, "each");
        }
    }
}
function main() {
    const myStrategy = new SpyDropStrategy();
    const myRangesExecutor = new RangesExecutor(stocksData, myStrategy, 10000, 300);
    const executionResults = myRangesExecutor.allRangesExecution();
    console.log("execution results:", executionResults);
    fs.writeFile("./executionResults.json", JSON.stringify(executionResults), function(err) {
        if (err) throw err;
        console.log('complete');
    });
}
main();
