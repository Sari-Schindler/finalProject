const express = require('express');
require('dotenv').config();
const usersRouter = require('./routes/usersRoute.js');
const registerRouter = require('./routes/registerRoute.js');
const loginRouter = require('./routes/loginRoute.js');
const strategyRouter = require('./routes/strategyRoute.js'); // Update this line
const submitFormRouter = require('./routes/submitFormRoute.js');

const authenticateToken = require('./middleware/authenticateToken.js');
const cors = require('cors');
const https = require('https');
// const example = require('./example.js');
const fs = require('fs');

// Initialize environment variables
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/example', (req, res) => {
    try {
      console.log("app server")
      const executionResults = JSON.parse(fs.readFileSync('./executionResults.json', 'utf8'));
      res.json(executionResults); // Send JSON response
    } catch (error) {
      console.error('Error reading execution results:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.get('/gptresponse', (req, res) => {
  try {
    console.log("gpt response server")
    const executionResults = JSON.parse(fs.readFileSync('./data/executionResults.json', 'utf8'));
    res.json(executionResults); // Send JSON response
  } catch (error) {
    console.error('Error reading execution results:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})  

// app.get('/example', example)
app.use('/strategy', strategyRouter); // Ensure this route is correctly set up
app.use('/submitForm', submitFormRouter);

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use(authenticateToken);
app.use('/users', usersRouter);

app.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`));

