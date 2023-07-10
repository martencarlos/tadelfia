"use client";
import { useEffect } from "react";
import styles from "./welcome.module.css";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

var slideIndex = 1;

function Welcome() {
  function plusDivs(n) {
    showDivs((slideIndex += n));
  }

  function showDivs(n) {
    var i;
    var x = document.querySelectorAll("[class*=reviewText]");
    if (x.length !== 0) {
      if (n > x.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = x.length;
      }
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      x[slideIndex - 1].style.display = "flex";
    }
  }

  useEffect(() => {
    // setTimeout(() => {
    showDivs(slideIndex);
    // }, 1000);
  }, []);

  return (
    <div className={styles.welcome}>
      <div className={styles.hero}>
        <div className={styles.txtContainer}>
          <h1 className={styles.h1}>{"Welcome to T'Adelfia"}</h1>
          <p
            className={styles.p}
          >{`Curiosity and the desire to spend an unforgettable holiday in a dreamy setting has inevitably led you here, to our establishment of apartments “T'adelfia”. Welcome!`}</p>
          <p
            className={styles.p}
          >{`The wheelchair accessible property of 7 holiday apartments in a bucolic setting has, above all, a story to tell. And it begins with its name, “T' adelfia” which means “The Brothers” in Greek. “T'adelfia” is a little gem, completely refurbished, in a green Mediterranean setting, where the prominent shade of yellow will remind you of the true colours of the island of Corfu.`}</p>
          <p
            className={styles.p}
          >{`Each apartment opens up to the pool with splendid views and offer the opportunity to recharge, whether as a couple or amidst family or friends. To complete this idyllic picture, a number of quiet beaches, some of the most sought-after on the island, charming little tavernas by the water and foot trails for the more athletic are all just a stone-throw away.`}</p>
          <p
            className={styles.p}
          >{`Experience this atmosphere full of promises and enjoy yourself. We hope to welcome you soon to “T'adelfia” so you can discover first hand this enchanting place and become part of the story.`}</p>
        </div>
        <div className={styles.rightSideContainer}>
          <div className={styles.accomplishments}>
            <h2 className={styles.h2}>{"Accomplishments"}</h2>
            <div className={styles.imgContainer}>
              <Image
                className={styles.image}
                src="/welcome/airbnb.webp"
                alt="ourStory"
                height={200}
                width={200}
                priority
              />
              <Image
                className={styles.image}
                src="/welcome/booking.webp"
                alt="ourStory"
                height={200}
                width={200}
                priority
              />
            </div>
          </div>

          <div className={styles.guestReviews}>
            <h2 className={styles.h2}>{"Guest Reviews"}</h2>
            <div className={styles.reviewContainer}>
              <div className={styles.reviewText} style={{display: "flex"}}>
              &quot;We were privileged to be the first clients in T`Adelfia
                apartments in July 2019. We enjoyed this beautiful and
                comfortable place with close access to some of the nicest
                beaches in Corfu. We also benefited from a personalised and
                friendly service from the staff, which made our first visit to
                Corfu an unforgettable experience. A real jewel to be
                discovered...&quot;
              </div>
              <div className={styles.reviewText}>
              &quot;{
                  "It is very clear that a lot of time and attention to detail has gone into this project and the results are amazing. It is especially nice to see what you have done with an old unused building. The rooms are lovely with high quality fittings and decoration - and fantastic views across to Corfu Town."
                }&quot;
              </div>

              <div className={styles.reviewText}>
              &quot;{
                  "Perché au sommet d'une petite montagne et à quelques minutes en voiture des plages magnifiques, T'adelfia nous a conquis et nous reviendrons"
                }&quot;
              </div>
              <div className={styles.previous} onClick={() => plusDivs(-1)}>
                <FaAngleLeft />
              </div>
              <div className={styles.next} onClick={() => plusDivs(+1)}>
                <FaAngleRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
