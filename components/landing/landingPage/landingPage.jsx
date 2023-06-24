import React from "react";
import Image from "next/image";
import styles from "./landingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      
      <Image
        src="/landing1.webp"
        alt="Exterior pool view of a villa"
        className={styles.landingImage}
        width={1470}
        height={1050}
      />

      <div className={styles.logoContainer}>
        <Image
          src="/logo.webp"
          alt="logo"
          className={styles.logo}
          width={255}
          height={253}
        />
      </div>
      
    </div>
  );
}

export default LandingPage;
