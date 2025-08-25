import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT, // ✅ should be process.env
      auth: {
        user: process.env.MAILTRAP_SMTP_USER, // ✅ should be process.env
        pass: process.env.MAILTRAP_SMTP_PASS, // ✅ should be process.env
      },
    });

    const info = await transporter.sendMail({
      from: '"Inngest TMS" <no-reply@inngest-tms.com>', // ✅ better format
      to,       // ✅ your parameter `to`
      subject,  // ✅ subject line
      text,     // ✅ plain text body
    });

    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail Error:", error.message);
    throw error;
  }
};
