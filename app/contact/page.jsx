"use client";
import React from "react";
import styles from "./page.module.css";
import TextField from "@mui/material/TextField";

function Contact() {

  function sendForm(e){
    e.preventDefault()
    const form = e.target
    form.reset()
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
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1534.014240168926!2d19.9268685!3d39.7390111!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135b43328627b151%3A0x92b81cb34a272148!2sT&#39;adelfia%20Holiday%20Appartments%20Corfu!5e0!3m2!1ses!2sde!4v1687638128432!5m2!1ses!2sde"
            width="600"
            height="450"
            className={styles.map}
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
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
              style={{ minHeight:"100px", fontSize: "16px", padding: "8.5px 14px", width: "100%" }}
              // minRows={3}
              id="messageToHost"
              className={styles.textarea}
              placeholder="Message for the host"
            />
            </div>
            <button className={styles.button} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
