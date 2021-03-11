const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send welcome email
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "beausoleil.justin@gmail.com",
    subject: "Thank you for joining brandon's website.",
    text: `Welcome to the application ${name}. Let me know if you have any questions.`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "beausoleil.justin@gmail.com",
    subject: "Account Cancelled",
    text: `${name}, your account has been cancelled.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
