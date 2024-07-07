const fs = require('fs');
const path = require('path');

module.exports.gptresponseController = {
  getGptResponse(req, res) {
    try {
      const executionResults = JSON.parse(fs.readFileSync(
          path.resolve(__dirname, '../data/executionResults.json'),
          'utf8'));
      res.json(executionResults);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


module.exports.gptresponseController = {
  getGptResponse(req, res) {
    try {
      const executionResults = JSON.parse(fs.readFileSync(
          path.resolve(__dirname, '../data/executionResults.json'),
          'utf8'));
      res.json(executionResults);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
