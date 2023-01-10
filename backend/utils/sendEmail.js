import nodemailer from "nodemailer";

const sendEmail = async (subject, message, sendTo, sendFrom, replyTo) => {
  // Email transporter and options
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  const options = {
    from: sendFrom,
    to: sendTo,
    replyTo: replyTo,
    subject: subject,
    html: message,
  };

  // Send email
  transporter.sendMail(options, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  })
}

export default sendEmail;
