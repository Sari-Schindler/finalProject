const  https = require("https");
//צריך לבדוק אם זה בעייתי: כשמגיעים ליום האחרון בהיסטוריה וכבר אין לאן להעלות את האינדקס הפונקציה getNextDate מדפיסה הודעה ולא מחזירה כלום
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
        //this.stocks = new Map();
        this.strategy = null;
        this.rangeExecutor = null;
        this.investedMoney = 0;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
        this.strategy.portfolio = this;
    }


    //get data by date
    getStockData(date) {
        return this.stocksData.find(day => day.date === date);
    }


    getNextDate() {
        if (this.stocksData[this.index + 1] !== undefined) {
            this.index++;
            return this.stocksData[this.index].date;
        } else {
            console.log('No historical data available for the given date.');
        }

    }

    convertDateToString(date) {
        return date.toISOString().split('T')[0];
    }

    convertStringToDate(stringDate) {
        const date =  new Date(stringDate);
        if (!date.getTime()) {
            console.log('stringDate:', stringDate);
            throw new Error('Invalid date string');
        }
        return date;
    }

    isFirstDayOfMonth() {
        // console.log("curr day month: ", this.convertStringToDate(this.stocksData[this.index].date).getMonth())
        // console.log("last day month: ", this.convertStringToDate(this.stocksData[this.index - 1].date).getMonth())

        if (this.convertStringToDate(this.stocksData[this.index].date).getMonth()
            !== this.convertStringToDate(this.stocksData[this.index - 1].date).getMonth()
        ) {
            return true;
        }
        return false;
    }


    rangeExecution() {
        // const firstDate = new Date(this.currentDate);

        const startValue = this.cash;

        console.log('start date: ',this.stocksData[this.index].date, 'last date: ', this.endDate)
        //let index = startIndex;
        for (let date = this.startDate; date <= this.endDate; date = this.getNextDate()) {
            //runStrCount++;

            this.currentDate = date;
            //console.log("Current date (inner loop): ", date);
            this.strategy.dayActions();

        }
        console.log("left cash:", this.cash);

        const finalValue = this.cash  + this.checkStockPrice(this.strategy.stockSymbol) * this.stocks;
        const profit = finalValue - startValue;
        console.log("invested: ", this.investedMoney, "profit: ", profit, "final value: ", finalValue, "stocks amount: ", this.stocks);
        return profit / this.investedMoney;
    }


    buyStocksByDollars(dollars) {
        const stockCost = this.checkStockPrice();
        //console.log("stock cost: ", stockCost)
        if (stockCost === 0) {
            console.log('No historical data available for the given date.');
            return;
        }
        const stocksAmount = dollars / stockCost;
        if (this.cash - dollars >= 0) {
            this.cash -= dollars;
            this.stocks += stocksAmount;
            this.investedMoney += dollars;
            //this.addStock();
            console.log(`Bought ${stocksAmount} shares of ${this.strategy.stockSymbol} for $${stockCost} each.`);
        } else {
            console.log('Not enough cash to buy the stocks.');
        }

    }

    sellStocksByDollars(dollars) {
        const stockCost = this.checkStockPrice();
        if (stockCost === 0) {
            console.log('No historical data available for the given date.');
            return;
        }
        const stocksAmount = dollars / stockCost;
        this.cash += dollars;
        this.stocks -= stocksAmount;
    }

    sellAll(){
        const stockCost = this.checkStockPrice();
        if (stockCost === 0) {
            console.log('No historical data available for the given date.');
            return;
        }
        this.cash += this.stocks * stockCost;
        this.stocks = 0;
    }

    checkStockPrice() {
        //const stockData = this.getStockData(this.currentDate);
        const stockData = this.stocksData[this.index];
        //console.log("stock data: ", stockData)
        //return stockData ? stockData[stockSymbol] : 0;
        return stockData[this.strategy.stockSymbol];

    }

//for stocks as a map
    // addStock() {
    //     if (this.stocks.has(this.strategy.stockSymbol)) {
    //         this.stocks.set(this.strategy.stockSymbol, this.stocks.get(this.strategy.stockSymbol) + this.strategy.quantity);
    //     } else {
    //         this.stocks.set(this.strategy.stockSymbol, this.strategy.quantity);
    //     }
    // }

    // removeStock() {
    //     if (this.stocks.has(this.strategy.stockSymbol)) {
    //         const currentQuantity = this.stocks.get(this.strategy.stockSymbol);
    //         if (currentQuantity > this.strategy.quantity) {
    //             this.stocks.set(this.strategy.stockSymbol, currentQuantity - this.strategy.quantity);
    //         } else {
    //             this.stocks.delete(this.strategy.stockSymbol);
    //         }
    //     } else {
    //         console.log(`Stock ${this.strategy.stockSymbol} not found in portfolio`);
    //     }
    // }

    // getPortfolio() {
    //     const portfolio = {};
    //     for (const [symbol, quantity] of this.stocks.entries()) {
    //         portfolio[symbol] = quantity;
    //     }
    //     return portfolio;
    // }
    //
    // getPortfolioValue() {
    //     let value = this.cash;
    //     for (const [symbol, quantity] of this.stocks.entries()) {
    //         value += quantity * this.checkStockPrice();
    //     }
    //     return value;
    // }

}

module.exports = Portfolio;