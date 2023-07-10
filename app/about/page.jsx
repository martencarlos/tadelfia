import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import OurStory from "@/components/landing/ourStory/ourStory";

function About() {
  return (
    <div className={styles.about}>
      <OurStory />
      <div className={styles.team}>
        <h1 className={styles.teamTitle}>Meet the team</h1>
        <div className={styles.teamContainer}>
          <div className={styles.teamMember}>
            <Image
              className={styles.avatar}
              alt="person"
              src="/team/1.webp"
              width={200}
              height={200}
            />
            <h3 className={styles.title}>Alexandros</h3>
            <p className={styles.description}>
            &quot; We have dedicated a whole year designing and renovating our family
              property with the single purpose of offering a genuine experience
              of Corfiot hospitality to our guests. Enjoy yourselves! &quot;
            </p>
          </div>

          <div className={styles.teamMember}>
            <Image
              className={styles.avatar}
              alt="person"
              src="/team/2.webp"
              width={200}
              height={200}
            />
            <h3 className={styles.title}>Katerina</h3>
            <p className={styles.description}>
            &quot;{
                " I have lived on this beautiful island for 15 years and know it inside out. I will advise you on the most beautiful sights, the best authentic restaurants and experiences. I'll do my best to make your stay pleasant, relaxing and interesting. Looking forward to meet you! "
              }&quot;
            </p>
          </div>

          <div className={styles.teamMember}>
            <Image
              className={styles.avatar}
              alt="person"
              src="/team/3.webp"
              width={200}
              height={200}
            />
            <h3 className={styles.title}>Samy</h3>
            <p className={styles.description}>
            
            &quot;{
                " We are thrilled by the support and positive feedbacks we've received so far! We will continue working to offer an authentic experience in one of the most beautiful places on the island. Welcome! "
              } &quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
