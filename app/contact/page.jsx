

import styles from "./page.module.css";
import ContactForm from "@/components/contactForm/contactForm";

// Static metadata
export const metadata = {
   title: "Contact", description: "Contact details" 
}

function Contact() {
 
  return (
    <div className={styles.contactFullPage}>
      <div className={styles.contactCard}>
        <div className={styles.contactDetails}>
          <div className={styles.contactText}>
            <h1 className={styles.contactCardH1}>{"Contact"}</h1>
            <br />
            <h2 className={styles.contactCardH2}>{"tadelfiacorfu@gmail.com"}</h2>
            <h2 className={styles.contactCardH2}>{"+49 (0) 151 681 187 10"}</h2>
          </div>

          <div className={styles.mapBackground}>
              
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53529.55012991015!2d19.878696859655616!3d39.741323140837494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135b43328627b151%3A0x92b81cb34a272148!2sT&#39;adelfia%20Holiday%20Appartments%20Corfu!5e0!3m2!1sen!2ses!4v1688806092332!5m2!1sen!2ses"
              width="600"
              height="450"
              
              style={{ border: "0" }}
              allowFullScreen= {false}
              className={styles.map}
              // loading="lazy"
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              
            ></iframe>
           
            </div>
      
        </div>
      </div>
      {/* Contact Form section */}
      <ContactForm />
    </div>
  );
}

export default Contact;
