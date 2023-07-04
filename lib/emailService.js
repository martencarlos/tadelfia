import nodemailer from "nodemailer";

export async function sendTextMail(toEmail, subject, text) {
  var transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: text,
  };

  //wrapping transporter in a promise to work on deployed environment
  const sent = await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
        throw new Error(err);
      } else {
        resolve(info);
      }
    });
  });
  if (!sent) {
    throw new Error(sent);
  } else {
    console.log("Email Sent");
    return true;
  }
}

export async function sendHtmlMail(toEmail, subject, html) {
  var transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: html,
  };

  //wrapping transporter in a promise to work on deployed environment
  const sent = await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
        throw new Error(err);
      } else {
        resolve(info);
      }
    });
  });
  if (!sent) {
    throw new Error(sent);
  } else {
    console.log("Email Sent");
    return true;
  }
}
