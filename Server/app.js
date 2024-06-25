const https = require('https');
const yahooFinance = require('yahoo-finance2').default;
const Portfolio = require('./Portfolio');
const Strategy = require('./strategy');
https.globalAgent.options.rejectUnauthorized = false;

const myPortfolio = new Portfolio(new Date(), 20000);

function runPortfolioExample(stockSymbol, quantity) {

    myPortfolio.buyStock(stockSymbol, quantity);

    const portfolio = myPortfolio.getPortfolio();
    console.log('Current Portfolio:', portfolio);


}

class BuyAndHoldStrategy extends Strategy {
    constructor(stockSymbol, quantity) {
        super(stockSymbol, quantity);
    }

    firstDayActions() {
        console.log(`Buying ${this.quantity} shares of ${this.stockSymbol} on the first day.`);
        this.portfolio.buyStock();
    }

    dayActions() {}
}

//const result = myPortfolio.runOnEachDay(runPortfolioExample, 'QQQ', 1, 1);

const myStrategy = new BuyAndHoldStrategy('QQQ', 10);
myPortfolio.setStrategy(myStrategy);
myPortfolio.runOnEachDay();


const result = myPortfolio.getPortfolio();
console.log('Final Portfolio:', result);
console.log('Final Portfolio Value:', myPortfolio.getPortfolioValue());

