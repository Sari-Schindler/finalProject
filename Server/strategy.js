
//const stocksData = require('./stocksHistoricalData.json');
import https from 'https';
import yahooFinance from 'yahoo-finance2';

//import stocksData  from './stocksDataForTest.json';
import exp from 'constants';

https.globalAgent.options.rejectUnauthorized = false;

class Strategy{
    stockSymbol;
    quantity;
    months;
    portfolio;
    constructor(stockSymbol, quantity, months = 60) {
        this.stockSymbol = stockSymbol;
        this.quantity = quantity;
        this.months = months;
        this.portfolio = null;
    }

    firstDayActions() {
        console.warn('firstDayActions() must be implemented');
    }

    dayActions() {
        console.warn('dayActions() must be implemented');
    }
}
export default Strategy;
