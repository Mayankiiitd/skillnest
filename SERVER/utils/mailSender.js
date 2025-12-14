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
    // ✅ UPDATE: Now using your real, verified domain!
    // You can change 'noreply' to anything you want (e.g., 'support', 'info', 'admin')
    const fromAddress = "noreply@skillnest.digital"; 

    const data = await resend.emails.send({
      from: fromAddress,
      to: [email], // Now this works for ANY email address (friends, users, etc.)
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