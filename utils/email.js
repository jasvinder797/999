const nodemailer = require('nodemailer');

const sendMail = async (options) => {
  // Create Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // Create mail options
  const mailOptions = {
    from: 'Jasvinder Thakur <jasvinder797@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log(mailOptions);
  // send the mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
