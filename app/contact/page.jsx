import React from "react";
import styles from "./page.module.css";

function Contact() {
  return (
    <div className={styles.contactFullPage}>
      <div className={styles.contactCard}>
       
        <h1 className={styles.h1}>{"Directions"}</h1>
        <br />
        <br />
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
  );
}

export default Contact;
