const yahooFinance = require('yahoo-finance2').default;
const https = require('https');
//const stocksData = require('./stocksHistoricalData.json');
const stocksData = require('./stocksDataForTest.json')

//צריך לבדוק אם זה בעייתי: כשמגיעים ליום האחרון בהיסטוריה וכבר אין לאן להעלות את האינדקס הפונקציה getNextDate מדפיסה הודעה ולא מחזירה כלום
https.globalAgent.options.rejectUnauthorized = false;

class Portfolio {
    currentDate;
    index;
    cash;
    stocks;
    strategy;
    star
    constructor(currentDate, cash, index = 0) {
        this.currentDate = currentDate;
        this.index = index;
        this.cash = cash;
        this.stocks = new Map();
        this.strategy = null;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
        this.strategy.portfolio = this; // Assign the portfolio to the strategy
    }



    //get data by date
    getStockData(date) {
        return stocksData.find(day => day.date === date);
    }



    getNextDate() {
        if(stocksData[this.index + 1] !== undefined){
            this.index++;
            return stocksData[this.index].date;
        }
        else{
            console.log('No historical data available for the given date.');
        }

    }

    convertDateToString(date) {
        return date.toISOString().split('T')[0];
    }

    convertStringToDate(stringDate) {
        return new Date(stringDate);
    }

    runOnEachDay(months) {
        for (let index = 0; index < stocksData.length; index++) {
            //this.currentDate = day.date;
            this.index = index;
            console.log("Current date (big loop): ", stocksData[this.index].date);
            if (index === 0) {
                this.strategy.firstDayActions();
            }
            else if(months !== undefined){
                let percentageIncrease = this.runStrategy(months);
                console.log('Final Percentage Increase:', percentageIncrease);
            }
            console.log('Portfolio Value:', this.getPortfolioValue());

        }
    }

    runStrategy(months) {
        // const firstDate = new Date(this.currentDate);
        const lastDayString = stocksData[this.index].date;
        let lastDay = this.convertStringToDate(lastDayString);
        lastDay.setMonth(lastDay.getMonth() + months);
        lastDay = this.convertDateToString(lastDay);

        const startValue = this.checkStockPrice(this.strategy.stockSymbol);

        console.log('start date: ',stocksData[this.index].date, 'last date: ', lastDay)
        //let index = startIndex;
        for (let date = stocksData[this.index].date; date <= lastDay; date = this.getNextDate()) {
            console.log("Current date (inner loop): ", date);
            this.strategy.dayActions();

        }

        const finalValue = this.checkStockPrice(this.strategy.stockSymbol);
        return (finalValue - startValue) / startValue * 100;
    }


    buyStock() {
        const stockCost =  this.checkStockPrice();
        if(stockCost === 0){
            console.log('No historical data available for the given date.');
            return;
        }
        if (this.cash - stockCost >= 0) {
            this.cash -= stockCost;
            this.addStock();
            console.log(`Bought ${this.strategy.quantity} shares of ${this.strategy.stockSymbol} for $${stockCost} each.`);
        } else {
            console.log('Not enough cash to buy the stocks.');
        }

    }

    checkStockPrice() {
        //const stockData = this.getStockData(this.currentDate);
        const stockData = stocksData[this.index];
        //return stockData ? stockData[stockSymbol] : 0;
        return stockData[this.strategy.stockSymbol];

    }


    addStock() {
        if (this.stocks.has(this.strategy.stockSymbol)) {
            this.stocks.set(this.strategy.stockSymbol, this.stocks.get(this.strategy.stockSymbol) + this.strategy.quantity);
        } else {
            this.stocks.set(this.strategy.stockSymbol, this.strategy.quantity);
        }
    }

    removeStock() {
        if (this.stocks.has(this.strategy.stockSymbol)) {
            const currentQuantity = this.stocks.get(this.strategy.stockSymbol);
            if (currentQuantity > this.strategy.quantity) {
                this.stocks.set(this.strategy.stockSymbol, currentQuantity - this.strategy.quantity);
            } else {
                this.stocks.delete(this.strategy.stockSymbol);
            }
        } else {
            console.log(`Stock ${this.strategy.stockSymbol} not found in portfolio`);
        }
    }

    getPortfolio() {
        const portfolio = {};
        for (const [symbol, quantity] of this.stocks.entries()) {
            portfolio[symbol] = quantity;
        }
        return portfolio;
    }

    getPortfolioValue() {
        let value = this.cash;
        for (const [symbol, quantity] of this.stocks.entries()) {
            value += quantity * this.checkStockPrice(symbol);
        }
        return value;
    }

}



module.exports = Portfolio;
