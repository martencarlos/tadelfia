
import Image from "next/image";
import styles from "./landingPage.module.css";
import landingImg from '/public/landing.webp'

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      
      <Image
        src={landingImg}
        alt="Exterior pool view of a villa"
        className={styles.landingImage}
        priority={true}
        quality={40}
        placeholder="blur"
        // placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
        sizes="100vw"
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
