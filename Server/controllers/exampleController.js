const fs = require('fs');

module.exports.exampleController = {
  getExample(req, res) {
    try {
      const executionResults = JSON.parse(fs.readFileSync('./executionResults.json', 'utf8'));
      res.json(executionResults);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
