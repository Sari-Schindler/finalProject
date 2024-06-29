const yahooFinance = require('yahoo-finance2').default;
const https = require('https');

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
    constructor(stocksData, startDate = null, endDate = null, cash, index = 0) {
        this.stocksData = stocksData;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentDate = startDate;
        this.index = index;
        this.cash = cash;
        this.stocks = 0
        //this.stocks = new Map();
        this.strategy = null;
        this.rangeExecutor = null;
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
        if(this.stocksData[this.index + 1] !== undefined){
            this.index++;
            return this.stocksData[this.index].date;
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

    isFirstDayOfMonth() {
        if(this.convertStringToDate(this.stocksData[this.index]).getMonth() != this.convertStringToDate(this.stocksData[this.index - 1]).getMonth()){
            return true;
        }
        return false;
    }


    rangeExecution() {
        // const firstDate = new Date(this.currentDate);

        const startValue = this.cash;

        //console.log('start date: ',this.stocksData[this.index].date, 'last date: ', this.endDate)
        //let index = startIndex;
        for (let date = this.startDate; date <= this.endDate; date = this.getNextDate()) {
            //runStrCount++;

            this.currentDate = date;
            //console.log("Current date (inner loop): ", date);
            this.strategy.dayActions();
            this.index++;

        }
        this.index--;
        console.log("cash:", this.cash);

        const finalValue = this.checkStockPrice(this.strategy.stockSymbol) * this.stocks;
        const investedMoney = startValue - this.cash;
        const profit = finalValue - investedMoney;
        console.log("invested: ", investedMoney, "profit: ", profit, "start value: ", startValue);
        return profit / investedMoney;
    }


    buyStocksByDollars(dollars) {
        const stockCost =  this.checkStockPrice();
        //console.log("stock cost: ", stockCost)
        if(stockCost === 0){
            console.log('No historical data available for the given date.');
            return;
        }
        const stocksAmount = stockCost / dollars;
        if (this.cash - dollars >= 0) {
            this.cash -= dollars;
            this.stocks += stocksAmount;
            //this.addStock();
            //console.log(`Bought ${this.strategy.quantity} shares of ${this.strategy.stockSymbol} for $${stockCost} each.`);
        } else {
            console.log('Not enough cash to buy the stocks.');
        }

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
