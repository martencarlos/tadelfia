"use client";
import { useState } from "react";
import styles from "./contactForm.module.css";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ContactForm() {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  function sendForm(e) {
    e.preventDefault();
    setSendingEmail(true);
    const form = e.target;
    const formInfo = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      messageToHost: form.messageToHost.value,
    };

    fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    })
      .then((res) =>  {
        if (res.status === 200) {
        form.reset();
        setSendingEmail(false);
        setOpenToast(true);
        }else
        {
          alert("Something went wrong. Please try again later.")
        }
      });
  }
{/* Contact Form section */}
  return (
      <div className={styles.contactFormSection}>
        <div className={styles.contactFormCard}>
          <div className={styles.contactFormHeader}>
            <h1 className={styles.h1}>{"Get in touch"}</h1>
            <p className={styles.p}>
              When would you like to visit Corfu and what are your needs? We’d
              love to hear from you!{" "}
            </p>
          </div>
          <form onSubmit={sendForm} className={styles.contactForm}>
            {/* Contact Section */}
            <h3 className={styles.h2}>Contact details</h3>
            <div className={styles.formGroup}>
              {/* firstname*/}
              <TextField
                label="First Name"
                id="firstName"
                required
                size="small"
                className={styles.flexItem}
              />
              {/* lastname*/}
              <TextField
                label="Last Name"
                id="lastName"
                required
                size="small"
                className={styles.flexItem}
              />
            </div>
            <div className={styles.formGroup}>
              {/* email*/}
              <TextField
                label="Email"
                type="email"
                id="email"
                required
                size="small"
                className={styles.flexItem}
              />
              {/* phone*/}
              <TextField
                label="Phone"
                type="tel"
                id="phone"
                pattern="/^\+(?:[0-9] ?){6,14}[0-9]$/"
                required
                size="small"
                className={styles.flexItem}
              />
            </div>
            <div className={styles.formGroup}>
              {/*Comment to host*/}
              <textarea
                name="messageToHost"
                id="messageToHost"
                className={styles.textarea}
                placeholder="Message for the host"
              />
            </div>
            <button className={styles.button} type="submit">
              {sendingEmail ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
   
      <Snackbar open={openToast} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Message sent to host successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default ContactForm;
