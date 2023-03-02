require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(email, code, username) {
  try {
    const smtpEndpoint = "smtp.gmail.com";

    const port = 465;

    const senderAddress = "Magnolia-CMS <ADDRESS>";

    var toAddress = email;

    const smtpUsername = process.env.SMTP_MAIL;

    const smtpPassword = process.env.SMTP_PASSWORD;

    var subject = "Verify your email";
    var nameOfUser = email.split("@")[0];
    // The body of the email for recipients
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
      <div>Welcome <b>${username}</b></div><br/>
        <p>Your authentication code is : </p> <b>${code}</b>
        <div></div>
      </body>
    </html>`;

    // Create the SMTP transport.
    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    // Specify the fields in the email.
    let mailOptions = {
      from: senderAddress,
      to: toAddress,
      subject: subject,
      html: body_html,
    };
  

    let info = await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}

module.exports = { sendEmail };
