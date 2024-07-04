const express = require('express');
const { submitFormController } = require('../controllers/submitFormController.js');

const router = express.Router();

router.post("/", submitFormController.submitForm);

module.exports = router;
