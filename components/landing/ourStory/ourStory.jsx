
import styles from "./ourStory.module.css";
import Image from "next/image";
import ourStoryImg from "/public/ourstory/ourstory.jpg";

function OurStory() {
  return (
    <div className={styles.ourStory}>
      <div className={styles.hero}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.image}
            src={ourStoryImg}
            placeholder="blur"
            alt="ourStory"
            fill
            priority
          />
        </div>
        <div className={styles.txtContainer}>
          <h1 className={styles.h1}>{"Our Story"}</h1>
          <p
            className={styles.p}
          >{`Nestled on top of a hill in the northern part of the island, the property is the realisation of two brothers' dream, Stephanos and Giannis Geronymos in the eighties.`}</p>
          <p
            className={styles.p}
          >{`Having fallen in love with the mesmerising views of the iridescent blue of the Ionian Sea, the wild olive groves and the warm colours of Loustri, they decided to make their project a reality. The property was conceived respecting the Venetian setting, tradition and architecture, thereby offering yet greater pleasure to holiday makers.`}</p>
          <p
            className={styles.p}
          >{`In 2018, it was Alexandros and Samy's turn to restore their father's dream. They took the leap and decided to bring the property back to life over a love of the place the desire to perpetuate the family's memory.`}</p>
        </div>
      </div>
    </div>
  );
}

export default OurStory;
