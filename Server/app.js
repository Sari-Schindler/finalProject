import express from 'express';
import 'dotenv/config';
import usersRouter from './routes/usersRoute.js';
import registerRouter from './routes/registerRoute.js';
import loginRouter from './routes/loginRoute.js';
import submitFormRouter from './routes/submitFormRoute.js';
import authenticateToken from './middleware/authenticateToken.js';
import cors from 'cors';
import https from 'https';
import example from './example.js';
import fs from 'fs';

// Initialize environment variables
import 'dotenv/config';
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

//app.get('/example', example)

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/submitForm', submitFormRouter);
app.use(authenticateToken);
app.use('/users', usersRouter);

app.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`));

