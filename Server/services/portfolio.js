const  https = require("https");
https.globalAgent.options.rejectUnauthorized = false;

class Portfolio {
    stocksData;
    currentDate;
    startDate
    endDate;
    index;
    cash;
    stocks;
    strategy;
    rangeExecutor;
    investedMoney;

    constructor(stocksData, startDate = null, endDate = null, cash, index = 0) {
        this.stocksData = stocksData;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentDate = startDate;
        this.index = index;
        this.cash = cash;
        this.stocks = 0;
        this.strategy = null;
        this.rangeExecutor = null;
        this.investedMoney = 0;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
        this.strategy.portfolio = this;
    }

    getStockData(date) {
        return this.stocksData.find(day => day.date === date);
    }


    getNextDate() {
        if (this.stocksData[this.index + 1] !== undefined) {
            this.index++;
            return this.stocksData[this.index].date;
        } 
    }

    convertDateToString(date) {
        return date.toISOString().split('T')[0];
    }

    convertStringToDate(stringDate) {
        const date =  new Date(stringDate);
        if (!date.getTime()) {
            throw new Error('Invalid date string');
        }
        return date;
    }

    isFirstDayOfMonth() {
        if (this.convertStringToDate(this.stocksData[this.index].date).getMonth()
            !== this.convertStringToDate(this.stocksData[this.index - 1].date).getMonth()
        ) {
            return true;
        }
        return false;
    }


    rangeExecution() {

        const startValue = this.cash;
        for (let date = this.startDate; date <= this.endDate; date = this.getNextDate()) {

            this.currentDate = date;
            this.strategy.dayActions();

        }
        const finalValue = this.cash  + this.checkStockPrice(this.strategy.stockSymbol) * this.stocks;
        const profit = finalValue - startValue;
        return profit / this.investedMoney;
    }


    buyStocksByDollars(dollars) {
        const stockCost = this.checkStockPrice();
        if (stockCost === 0) {
            return;
        }
        const stocksAmount = dollars / stockCost;
        if (this.cash - dollars >= 0) {
            this.cash -= dollars;
            this.stocks += stocksAmount;
            this.investedMoney += dollars;
        }

    }

    sellStocksByDollars(dollars) {
        const stockCost = this.checkStockPrice();
        if (stockCost === 0) {
            return;
        }
        const stocksAmount = dollars / stockCost;
        this.cash += dollars;
        this.stocks -= stocksAmount;
    }

    sellAll(){
        const stockCost = this.checkStockPrice();
        if (stockCost === 0) {
            return;
        }
        this.cash += this.stocks * stockCost;
        this.stocks = 0;
    }

    checkStockPrice() {
        const stockData = this.stocksData[this.index];
        return stockData[this.strategy.stockSymbol];

    }
}

module.exports = Portfolio;