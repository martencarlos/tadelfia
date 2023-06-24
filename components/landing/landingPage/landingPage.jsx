import React from "react";
import Image from "next/image";
import styles from "./landingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      
      <Image
        src="/landing2.webp"
        alt="Exterior pool view of a villa"
        className={styles.landingImage}
        width={1585}
        height={891}
      />

      <div className={styles.logoContainer}>
        <Image
          src="/logo.webp"
          alt="logo"
          className={styles.logo}
          width={200}
          height={200}
        />
      </div>
      
    </div>
  );
}

export default LandingPage;
