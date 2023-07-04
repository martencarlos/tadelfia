import nodemailer from "nodemailer";

export async function sendTextMail(toEmail, subject, text) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
          pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD
        }
    });
  
    var mailOptions = {
      from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
      to: toEmail,
      subject: subject,
      text: text,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error(error);
      } else {
        console.log("Email Sent");
        return true;
      }
    });
  }


  export async function sendHtmlMail(toEmail, subject, html) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
          pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD
        }
    });
  
    var mailOptions = {
      from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
      to: toEmail,
      subject: subject,
      html: html,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error(error);
      } else {
        console.log("Email Sent");
        return true;
      }
    });
  }