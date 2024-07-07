const fs = require('fs');
const path = require('path');

module.exports.gptresponseController = {
  getGptResponse(req, res) {
    try {
      console.log("gpt response server");
      const executionResults = JSON.parse(fs.readFileSync(
          path.resolve(__dirname, '../data/executionResults.json'),
          'utf8'));
      res.json(executionResults);
    } catch (error) {
      console.error('Error reading execution results:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


module.exports.gptresponseController = {
  getGptResponse(req, res) {
    try {
      console.log("gpt response server");
      const executionResults = JSON.parse(fs.readFileSync(
          path.resolve(__dirname, '../data/executionResults.json'),
          'utf8'));
      res.json(executionResults);
    } catch (error) {
      console.error('Error reading execution results:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
