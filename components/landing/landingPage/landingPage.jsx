import React from "react";
import Image from "next/image";
import styles from "./landingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      
      <Image
        src="/landing.webp"
        alt="Exterior pool view of a villa"
        className={styles.landingImage}
        priority={true}
        placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
        width={1585}
        height={891}
      />

      <div className={styles.logoContainer}>
        <Image
          src="/logo.webp"
          alt="logo"
          priority
          placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
          className={styles.logo}
          width={250}
          height={250}
        />
      </div>
      
    </div>
  );
}

export default LandingPage;
