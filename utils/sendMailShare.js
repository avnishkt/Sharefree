const nodeMailer = require("nodemailer");


const share = async ( from, to, subject, text, html, res) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
const email= 'avnishkt16@gmail.com'
console.log(from.from)
    const mailOptions = await {
    
    from: from.from, // sender address
    to: from.to, // list of receivers
    subject: from.subject, // Subject line
    text: from.text, // plain text body
    html: from.html, // html body,
  };

  await transporter.sendMail(mailOptions,(error)=>{
    console.log(error)
  });
  console.log("mail sended to user");
};

module.exports = share;
