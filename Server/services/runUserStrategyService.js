const Strategy = require('../Strategy.js');
const RangesExecutor = require('../RangesExecutor.js');
const stocksData = require('../stocksHistoricalData.json');
const axios = require('axios');
const https = require('https');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const apiKey = process.env.API_KEY;  // Ensure you set this in your .env file
const apiUrl = `https://api.openai.com/v1/chat/completions`;

function readPrompt() {
    return new Promise((resolve, reject) => {
        fs.readFile('./prompts/prompt.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function getChatGptResponse(userInput) {
    try {
        const prompt = await readPrompt();
        const data = {
            model: 'gpt-3.5-turbo',
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

        const response = await axiosInstance.post(apiUrl, data, { headers });
        handleResponse(response);
    } catch (error) {
        console.error('Error:', error);
    }
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

function readGptResponse() {
    return new Promise((resolve, reject) => {
        fs.readFile('./gptResponse.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports.runUserStrategyService = {
    getChatGptResponse,
    readGptResponse
};
