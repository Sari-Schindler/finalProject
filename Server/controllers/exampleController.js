const fs = require('fs');

module.exports.exampleController = {
  getExample(req, res) {
    try {
      console.log("app server");
      const executionResults = JSON.parse(fs.readFileSync('./executionResults.json', 'utf8'));
      res.json(executionResults);
    } catch (error) {
      console.error('Error reading execution results:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
