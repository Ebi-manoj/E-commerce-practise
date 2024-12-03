import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';

export const sendEmail = asyncHandler(async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MP,
      },
    });

    const resetUrl = `http://localhost:3000/api/user/reset-password/${token}`;
    const info = await transporter.sendMail({
      from: '"Reset Password link 👻" <abc53@ethereal.email>', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Click the link to reset password', // plain text body
      html: `<a href="${resetUrl}">Click here</a> `,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    throw new Error(error, 'error sending email');
  }
});
