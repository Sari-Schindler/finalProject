import express from 'express';
import 'dotenv/config';
import usersRouter from './routes/usersRoute.js';
import registerRouter from './routes/registerRoute.js';
import loginRouter from './routes/loginRoute.js';
import submitFormRouter from './routes/submitFormRoute.js';
import authenticateToken from './middleware/authenticateToken.js';
import cors from 'cors';
import https from 'https';
import yahooFinance from 'yahoo-finance2';
import  Portfolio  from './portfolio.js'; // Use named import
import Strategy from './strategy.js';   // Use named import
import RangesExecutor from './rangesExecutor.js'; // Use named import
import fs from 'fs';
import path from 'path';

// Initialize environment variables
import 'dotenv/config';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/submitForm', submitFormRouter);
app.use(authenticateToken);
app.use('/users', usersRouter);

app.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`));

https.globalAgent.options.rejectUnauthorized = false;

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
const myRangesExecutor = new RangesExecutor(stocksData.default, myStrategy, 1000000, 3000);
const executionResults = myRangesExecutor.allRangesExecution();

console.log('Execution results:', executionResults);
fs.writeFile('./executionResults.json', JSON.stringify(executionResults), (err) => {
    if (err) throw err;
    console.log('Complete');
});
