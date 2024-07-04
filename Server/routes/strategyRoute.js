const express = require('express');
const { runUserStrategyController } = require('../controllers/runUserStrategyController.js');

const router = express.Router();

router.post("/", runUserStrategyController.runUserStrategy);

module.exports = router;
