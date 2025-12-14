// const nodemailer = require("nodemailer")

// const mailSender = async (email, title, body) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//       secure: false,
//     })

//     let info = await transporter.sendMail({
//       from: `"Studynotion | CodeHelp" <${process.env.MAIL_USER}>`, // sender address
//       to: `${email}`, // list of receivers
//       subject: `${title}`, // Subject line
//       html: `${body}`, // html body
//     })
//     console.log(info.response)
//     return info
//   } catch (error) {
//     console.log(error.message)
//     return error.message
//   }
// }

// module.exports = mailSender


const { Resend } = require("resend");

// Initialize Resend with the API Key from your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
  try {
    // ⚠️ IMPORTANT:
    // If you are in "Testing" mode (no domain verified), you can ONLY send to your own email.
    // Once you verify your domain on Resend, change this to: "info@yourdomain.com"
    const fromAddress = "onboarding@resend.dev"; 

    const data = await resend.emails.send({
      from: fromAddress,
      to: [email], // Resend requires an array for the 'to' field
      subject: title,
      html: body,
    });

    console.log("Email sent successfully via Resend:", data);
    return data;
  } catch (error) {
    console.log("Error sending email:", error);
    return error.message;
  }
};

module.exports = mailSender;