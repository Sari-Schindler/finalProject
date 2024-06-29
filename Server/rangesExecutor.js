const Portfolio = require('./Portfolio');

let runStrCount = 0;
let totalTime = 0;

class RangesExecutor {
    stocksData;
    portfolio;
    strategy;
    cash;
    sampleSize;
    constructor(stocksData, strategy, cash, sampleSize) {
        this.stocksData = stocksData;
        this.portfolio = null;
        this.strategy = strategy;
        this.cash = cash;
        this.sampleSize = sampleSize;
    }

    setPortfolio(portfolio) {
        this.portfolio = portfolio;
        this.portfolio.rangeExecutor = this; // Assign the portfolio to the strategy
    }


    allRangesExecution() {
        let profits = new Array(this.sampleSize);
        let totalProfit = 0;
        let executionsResults = new Array(this.sampleSize);
        const indexJump = Math.floor(this.stocksData.length / this.sampleSize);
        console.log("index jump:", indexJump);
            //index < this.stocksData.length - this.strategy.months * 22
        let sequentialIndex = 0
        for (let index = 0; index < this.stocksData.length - indexJump; index += indexJump) {

            console.log("index: ", index, "Sequential index: ", sequentialIndex);
            let lastDay = this.findLastDay(index);
            if(lastDay > this.convertStringToDate(this.stocksData[this.stocksData.length - 1].date)){
                console.log("break!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                break;
            }

            this.portfolio = new Portfolio(this.stocksData, this.stocksData[index].date, lastDay, this.cash, index);
            //this.setPortfolio(portfolio);
            this.portfolio.setStrategy(this.strategy);
            console.log("Current date (big loop): ", this.stocksData[index].date);
            if (index === 0) {
                this.portfolio.strategy.firstDayActions();
            }
            else if(this.portfolio.strategy.months !== 0){
                profits[sequentialIndex] = this.portfolio.rangeExecution();
                totalTime += (this.portfolio.endDate - this.portfolio.startDate);
                totalProfit += profits[sequentialIndex];
                executionsResults[sequentialIndex] = {date: this.stocksData[index].date, results: profits[sequentialIndex]};
                console.log('Percentage Increase:', profits[sequentialIndex]);
            }
            //console.log('Portfolio Value:', this.portfolio.getPortfolioValue());
            sequentialIndex++;


        }
        console.log('Final Percentage Increase:', totalProfit / profits.length);
        console.log("profits: ", profits);
        console.log("run counter: ", runStrCount, "total time: ", totalTime);
        return executionsResults;
    }

    findLastDay(index) {
        let lastDay = this.convertStringToDate(this.stocksData[index].date);
        lastDay.setMonth(lastDay.getMonth() + this.strategy.months);
        lastDay = this.convertDateToString(lastDay);
        return lastDay;
    }

    convertDateToString(date) {
        return date.toISOString().split('T')[0];
    }

    convertStringToDate(stringDate) {
        return new Date(stringDate);
    }

}


module.exports = RangesExecutor;
