const Strategy = require('./Strategy.js');
const RangesExecutor = require('./RangesExecutor.js');
const stocksData = require('./stocksHistoricalData.json');
const axios = require('axios');
const https = require('https');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();


const apiKey = '';
const apiUrl = `https://api.openai.com/v1/chat/completions`;



function runUserStrategy(userInput){
    getChatGptResponse(userInput);

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

}


function readPrompt() {
    let promptDescription = ``;
    fs.readFile('./prompts/prompt.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        promptDescription = data;
    });
    return promptDescription;

}

function getChatGptResponse(userInput) {
    const prompt = readPrompt();
    const data = {
        model: 'gpt-3.5-turbo',  // Use the appropriate model, such as 'gpt-4'
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: `User Input: ${userInput}` }
        ]
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const axiosInstance = axios.create({
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });

    axiosInstance.post(apiUrl, data, { headers })
        .then(response => handleResponse(response))
        .catch(error => console.error('Error:', error));
}

function handleResponse(response) {
    const responseContent = response.data.choices[0].message.content;
    const usage = response.data.usage;
    const totalTokens = usage.prompt_tokens + usage.completion_tokens;
    const totalCost = totalTokens * 0.002 / 1000;

    console.log('ChatGPT Response:', responseContent);
    console.log('Prompt Tokens:', usage.prompt_tokens);
    console.log('Completion Tokens:', usage.completion_tokens);
    console.log('Estimated Cost:', totalCost);

    fs.writeFile('gptResponse.txt', responseContent, err => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Response content written to file successfully.');
        }
    });
}




const userInvestmentStrategy = 'Buy 10 shares of "SPY" if the stock price drops by 3% in a day, and sell all shares if the stock price increases by 5%.';








