const nodeMailer = require("nodemailer");

const sendEmail = async (email, res) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    
    from: process.env.SMPT_MAIL,
    to: email,
    subject: "freeShare",
    text: `Hello,WELLCOME
    `,
    html:`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
    </head>
    <body>
        <table align="center" width="600" cellspacing="0" cellpadding="0">
            <tr>
                <td style="background-color: #f4f4f4; text-align: center; padding: 30px 0;">
                    <img src="https://i.pinimg.com/originals/b9/ab/f0/b9abf0a0feb3219f56a51448d8ffae2c.gif" alt="Welcome GIF" width="200" height="200" style="display: block; margin: 0 auto;">
                </td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 20px 0;">
                    <h1>Welcome to Our Community!</h1>
                    <p>Thank you for joining us. We're excited to have you as part of our community.</p>
                    <p><a href="https://freeshare-wtba.onrender.com" style="text-decoration: none; color: #007BFF;">Visit our website</a></p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `
  };

  await transporter.sendMail(mailOptions,(error)=>{
    console.log(error)
  });
  console.log("mail sended to user");
};

module.exports = sendEmail;
