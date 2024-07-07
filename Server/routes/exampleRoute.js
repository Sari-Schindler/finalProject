const express = require('express');
const { exampleController } = require('../controllers/exampleController.js');

const router = express.Router();

router.get("/", exampleController.getExample);

module.exports = router;
