const { submitFormService } = require("../services/submitFormService.js");

module.exports.submitFormController = {
  async submitForm(req, res) {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }

      await submitFormService.sendEmails({ name, email, message });
      res.status(200).json({ message: "Emails sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
