const Portfolio = require('./portfolio.js');

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
        this.portfolio.rangeExecutor = this;
    }


    allRangesExecution() {
        let profits = new Array(this.sampleSize);
        let totalProfit = 0;
        let executionsResults = new Array(this.sampleSize);
        let indexJump = Math.floor(this.stocksData.length / this.sampleSize);
        if (indexJump <= 1){
            indexJump = 1
        }
        let sequentialIndex = 0
        for (let index = 1; index < this.stocksData.length - indexJump; index += indexJump) {
            let lastDay = this.findLastDay(index);
            if(lastDay > this.stocksData[this.stocksData.length - 1].date){
                break;
            }

            this.portfolio = new Portfolio(this.stocksData, this.stocksData[index].date, lastDay, this.cash, index);
            this.portfolio.setStrategy(this.strategy);
            if (index === 0) {
                this.portfolio.strategy.firstDayActions();
            }
            const profit = this.portfolio.rangeExecution();
            if (profit) {
                profits[sequentialIndex] = profit;
                totalProfit += profits[sequentialIndex];
                executionsResults[sequentialIndex] = {date: this.stocksData[index].date, results: profits[sequentialIndex]};
                sequentialIndex++;
            }

          


        }
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