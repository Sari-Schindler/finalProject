const getChatGptResponse = require("./chatgpt.js");
const fs = require("fs");
const Strategy = require('./Strategy.js');
const RangesExecutor = require('./RangesExecutor.js');
const stocksData = require('./stocksHistoricalData.json');


const userInvestmentStrategy = 'Buy 10 shares of "SPY" if the stock price drops by 3% in a day, and sell all shares if the stock price increases by 5%.';
getChatGptResponse(userInvestmentStrategy);

let userStrategyString = '';

fs.readFile('./gptResponse.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    userStrategyString = data;
    eval(userStrategyString);

    console.log(userStrategyString);
});








