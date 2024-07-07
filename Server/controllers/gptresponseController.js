const fs = require('fs');

module.exports.gptresponseController = {
  getGptResponse(req, res) {
    try {
      console.log("gpt response server");
      const executionResults = JSON.parse(fs.readFileSync('../Server/data/executionResults.json', 'utf8'));
      res.json(executionResults);
    } catch (error) {
      console.error('Error reading execution results:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
