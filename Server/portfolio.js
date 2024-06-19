const yahooFinance = require('yahoo-finance2').default;
const https = require('https');

https.globalAgent.options.rejectUnauthorized = false;

class Portfolio {
    currentDate;
    cash;
    stocks;
    constructor(currentDate = new Date(), cash) {
        this.currentDate = currentDate;
        this.cash = cash;
        this.stocks = new Map();
    }

    async buyStock(stockSymbol, quantity) {
        try {
            const stockCost = await this.checkStockCost(stockSymbol);
            if (this.cash - stockCost >= 0) {
                this.cash -= stockCost;
                this.addStock(stockSymbol, quantity);
                console.log(`Bought ${quantity} shares of ${stockSymbol} for $${stockCost} each.`);
            } else {
                console.log('Not enough cash to buy the stocks.');
            }
        } catch (error) {
            console.error('Error buying stock:', error);
        }
    }

    async checkStockCost(stockSymbol) {
        try {
            // Clone the currentDate to avoid modifying the original instance
            const currentDate = new Date(this.currentDate);

            // Set period1 to the start of the current date
            currentDate.setUTCHours(0, 0, 0, 0);

            // Set period2 to the end of the current date
            const period2 = new Date(this.currentDate);
            period2.setUTCHours(23, 59, 59, 999);

            const results = await yahooFinance.historical(stockSymbol, {
                period1: currentDate.getTime() / 1000, // Convert milliseconds to seconds
                period2: period2.getTime() / 1000      // Convert milliseconds to seconds
            });

            console.log("Results from checkStockCost:", results);

            if (results.length > 0) {
                return results[0].open;
            } else {
                throw new Error('No historical data available for the given date.');
            }
        } catch (error) {
            console.error('Error checking stock cost:', error);
            throw error;
        }
    }


    addStock(symbol, quantity) {
        if (this.stocks.has(symbol)) {
            this.stocks.set(symbol, this.stocks.get(symbol) + quantity);
        } else {
            this.stocks.set(symbol, quantity);
        }
    }

    removeStock(symbol, quantity) {
        if (this.stocks.has(symbol)) {
            const currentQuantity = this.stocks.get(symbol);
            if (currentQuantity > quantity) {
                this.stocks.set(symbol, currentQuantity - quantity);
            } else {
                this.stocks.delete(symbol);
            }
        } else {
            console.log(`Stock ${symbol} not found in portfolio`);
        }
    }

    getPortfolio() {
        const portfolio = {};
        for (const [symbol, quantity] of this.stocks.entries()) {
            portfolio[symbol] = quantity;
        }
        return portfolio;
    }
}

module.exports = Portfolio;
