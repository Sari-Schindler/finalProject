const express = require('express');
const { RegisterController } = require('../controllers/registerController.js');
const { validateUserData, validate } = require('../middleware/validationMiddleware.js');

const registerRouter = express.Router();
const registerController = new RegisterController();

registerRouter.get('/exist', registerController.existUser);

registerRouter.post('/', validateUserData, (req, res, next) => validate(req, res, next), registerController.register);

module.exports = registerRouter;
