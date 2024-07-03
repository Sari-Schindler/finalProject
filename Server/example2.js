const fs = require('fs');
const Portfolio = require('./Portfolio');
const Strategy = require('./Strategy');
const RangesExecutor = require('./RangesExecutor');

class SpyDropStrategy extends Strategy {
    constructor() {
        super('SPY', 10); // stockSymbol is 'SPY', quantity is 10 shares
    }

    firstDayActions() {
        console.log(`Monitoring ${this.stockSymbol} for significant price changes.`);
    }

    dayActions() {
        const stockPrice = this.portfolio.checkStockPrice();
        const previousDayPrice = this.portfolio.stocksData[this.portfolio.index - 1][this.stockSymbol];

        if (previousDayPrice && stockPrice <= previousDayPrice * 0.97 && this.portfolio.stocks === 0) {
            this.portfolio.buyStocksByDollars(stockPrice * this.quantity);
            console.log(`Bought 10 shares of ${this.stockSymbol} at $${stockPrice}.`);
        }

        if (this.portfolio.stocks > 0 && stockPrice >= previousDayPrice * 1.05) {
            this.portfolio.sellAll();
            console.log(`Sold all shares of ${this.stockSymbol} at $${stockPrice}.`);
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
console.log('Execution results:', executionResults);
fs.writeFile('./executionResults.json', JSON.stringify(executionResults), (err) => {
    if (err) throw err;
    console.log('Complete');
});
