import nodemailer from "nodemailer";
import 'dotenv/config';

export const submitFormService = {
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
      from: process.env.MANAGER_EMAIL,
      to: process.env.MANAGER_EMAIL,
      subject: 'New Contact Form Submission',
      text: `You received a new message from ${name} (${email}): ${message}`,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.MANAGER_EMAIL,
      to: email,
      subject: 'Confirmation of Your Submission',
      text: `Thank you, ${name}, for your message. We will get back to you soon.`,
      //  attachments: [
      //     {
      //       filename: 'logo.png', // Replace with your image filename
      //       path:  '../Images/logo.png', // Replace with actual path to your image
      //       cid: 'unique@kreata.ee' // Unique identifier
      //     }
      //   ]
    });
    
  }
};
