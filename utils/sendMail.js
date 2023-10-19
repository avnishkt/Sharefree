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
    subject: "SIH",
    text: `Hello Nikita Sharma,

    We are pleased to confirm your registration for the upcoming SIH Event, scheduled to be held on [Event Date] at [Event Venue]. Thank you for your interest in our event and for registering as a participant.
    
    The XYZ Event promises to be an exciting and informative experience, with a range of guest speakers and industry experts scheduled to attend. We believe that you will find the event to be both insightful and engaging, and we look forward to your active participation.
    
    As a registered candidate, you will receive regular updates about the event and its schedule. We will also be sending you additional information in the coming days, including details on how to access the event platform and participate in the sessions.
    
    If you have any questions or concerns regarding your registration, please do not hesitate to contact us at [Contact Email or Phone Number]. We will be happy to assist you in any way we can.
    
    Thank you again for your interest in our event. We look forward to seeing you at the XYZ Event!
    
    Best regards,
    pirates
    `,
  };

  await transporter.sendMail(mailOptions,(error)=>{
    console.log(error)
  });
  console.log("mail sended to user");
};

module.exports = sendEmail;
