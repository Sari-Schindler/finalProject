import yahooFinance from 'yahoo-finance2';
import  Portfolio  from './portfolio.js'; // Use named import
import Strategy from './strategy.js';   // Use named import
import RangesExecutor from './rangesExecutor.js'; // Use named import
import fs from 'fs';
import path from 'path';

async function example(){
    
//https.globalAgent.options.rejectUnauthorized = false;

const stocksData = await import('./stocksHistoricalData.json', { assert: { type: 'json' } });

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
const myRangesExecutor = new RangesExecutor(stocksData.default, myStrategy, 1000000, 4000);
const executionResults = myRangesExecutor.allRangesExecution();

console.log('Execution results:', executionResults);
fs.writeFile('./executionResults.json', JSON.stringify(executionResults), (err) => {
    if (err) throw err;
    console.log('Complete');
});


    
}

export default example