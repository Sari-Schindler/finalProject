const express = require('express');
require('dotenv').config();
const usersRouter = require('./routes/usersRoute.js');
const registerRouter = require('./routes/registerRoute.js');
const loginRouter = require('./routes/loginRoute.js');
const strategyRouter = require('./routes/strategyRoute.js');
const submitFormRouter = require('./routes/submitFormRoute.js');
const exampleRouter = require('./routes/exampleRoute.js'); // Added line
const gptresponseRouter = require('./routes/gptresponseRoute.js'); // Added line

const authenticateToken = require('./middleware/authenticateToken.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/example', exampleRouter);
app.use('/gptresponse', gptresponseRouter);
app.use('/strategy', strategyRouter);
app.use('/submitForm', submitFormRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use(authenticateToken);
app.use('/users', usersRouter);

app.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`));
