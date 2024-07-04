const nodemailer = require("nodemailer");
require('dotenv').config();

const submitFormService = {
  async sendEmails({ name, email, message }) {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MANAGER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email to manager
    await transporter.sendMail({
      from: `"Investors Support" <${process.env.MANAGER_EMAIL}>`,
      to: process.env.MANAGER_EMAIL,
      subject: 'New Contact Form Submission',
      text: `You received a new message from ${name} (${email}): ${message}`,
    });

    // Send confirmation email to user with embedded image
    await transporter.sendMail({
      from: `"Investors Support" <${process.env.MANAGER_EMAIL}>`,
      to: email,
      subject: 'Confirmation of Your Submission',
      html: `
        <p>Thank you, ${name}, for your message. We will get back to you soon.</p><br></br><br></br>
        <p>Always with you,</p>
        <img src="cid:unique@nodemailer.com" alt="Logo" style="width: 100px; height: auto;" />
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: '../Client/Images/logo.png',
          cid: 'unique@nodemailer.com' // Use this CID to reference the image in the HTML
        }
      ]
    });
  }
};

module.exports = { submitFormService };
