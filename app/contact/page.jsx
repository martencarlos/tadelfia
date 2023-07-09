"use client";
import { useState } from "react";
import styles from "./page.module.css";
import TextField from "@mui/material/TextField";


function Contact() {
  const [sendingEmail, setSendingEmail] = useState(false);

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
        }else
        {
          alert("Something went wrong. Please try again later.")
        }
      });
  }

  return (
    <div className={styles.contactFullPage}>
      <div className={styles.contactCard}>
        <h1 className={styles.h1}>{"Contact"}</h1>
        <br />
        <br />
        <div className={styles.contactDetails}>
          <div className={styles.contactText}>
            <h3 className={styles.h3}>{"Contact details"}</h3>
            <p className={styles.p}>{"tadelfiacorfu@gmail.com"}</p>
            <p className={styles.p}>{"+49 (0) 151 681 187 10"}</p>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53529.55012991015!2d19.878696859655616!3d39.741323140837494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135b43328627b151%3A0x92b81cb34a272148!2sT&#39;adelfia%20Holiday%20Appartments%20Corfu!5e0!3m2!1sen!2ses!4v1688806092332!5m2!1sen!2ses"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            className={styles.map}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/*} <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1534.014240168926!2d19.9268685!3d39.7390111!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135b43328627b151%3A0x92b81cb34a272148!2sT&#39;adelfia%20Holiday%20Appartments%20Corfu!5e0!3m2!1ses!2sde!4v1687638128432!5m2!1ses!2sde"
            width="600"
            height="450"
            className={styles.map}
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
  ></iframe>*/}
        </div>
      </div>
      {/* Contact Form section */}
      <div className={styles.contactFormSection}>
        <div className={styles.contactFormCard}>
          <div className={styles.contactFormHeader}>
            <h2 className={styles.h3}>{"Contact Us"}</h2>
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
      </div>
    </div>
  );
}

export default Contact;
