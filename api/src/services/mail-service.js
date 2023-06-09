const nodemailer = require('nodemailer');
const config = require('../configs/config');

module.exports = {
  sendActivationLink: async (to, link) => {
    console.log('sendActivationLink', to, link);
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: false,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword
      }
    });

    await transporter.sendMail({
      from: config.smtpUser,
      to,
      subject: 'Prile email confirmation',
      text: '',
      html:
      `
        <div>
          <h1>To activate your email, click this link:</h1>
          <a href='${link}'>${link}</a>
        </div>
      `
    });
  }
};
