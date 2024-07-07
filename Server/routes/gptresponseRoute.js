const express = require('express');
const { gptresponseController } = require('../controllers/gptresponseController.js');

const router = express.Router();

router.get("/", gptresponseController.getGptResponse);

module.exports = router;
