import nodemailer from "nodemailer";

import { render } from '@react-email/render';
import { ContactFormEmail } from './emailTemplates/contactEmail';
import { BookingSuccessEmail } from './emailTemplates/bookingSuccessEmail';

var transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
  },
});


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
   
    return true;
  }
}

export async function sendContactForm(toEmail, subject, info) {
  
  var transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
    },
  });

  const jsonInfo = JSON.parse(info)
  const emailHtml = render(<ContactFormEmail info={jsonInfo} />);

  var mailOptions = {
    from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: emailHtml,
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
   
    return true;
  }
}

export async function sendBookingSuccess(toEmail, subject, booking) {

  var transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
    },
  });
  
  console.log("LIB - sending email to customer")
  console.log("booking:")
  console.log(booking)
  const jsonBooking = JSON.parse(booking)
  const emailHtml = render(<BookingSuccessEmail booking={jsonBooking} />);
  console.log("emailHtml:")
  console.log(emailHtml)

  var mailOptions = {
    from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: emailHtml,
  };

  //wrapping transporter in a promise to work on deployed environment
  const sent = await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      console.log("email sent?")
      console.log("info")
      console.log(info)
      console.log("error")
      console.log(err)
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
    console.log("email sent confirmed! ")
    return true;
  }
}
