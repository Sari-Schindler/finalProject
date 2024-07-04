const express = require('express');
const { LoginController } = require('../controllers/loginController.js');

const loginRouter = express.Router();
const loginController = new LoginController();

loginRouter.post("/", loginController.login);

module.exports = loginRouter;
