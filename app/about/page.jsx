
import styles from "./page.module.css";
import Image from "next/image";
import OurStory from "@/components/landing/ourStory/ourStory";
import team1Img from "/public/team/1.webp";
import team2Img from "/public/team/2.webp";
import team3Img from "/public/team/3.webp";

// Static metadata
export const metadata = {
  title: "About", description: "About us" 
}

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
              src={team1Img}
              placeholder="blur"
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
              src={team2Img}
              placeholder="blur"
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
              src={team3Img}
              placeholder="blur"
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
