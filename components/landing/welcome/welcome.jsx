import React from 'react'
import styles from './welcome.module.css'

function Welcome() {
  return (
    <div className={styles.welcome}>
        <h1 className={styles.h1}>{"Welcome to T'Adelfia Apartments"}</h1>
        <p className={styles.p}>{`Curiosity and the desire to spend an unforgettable holiday in a dreamy setting has inevitably led you here, to our establishment of apartments “T'adelfia”. Welcome!`}</p>
        <p className={styles.p}>{`The wheelchair accessible property of 7 holiday apartments in a bucolic setting has, above all, a story to tell. And it begins with its name, “T' adelfia” which means “The Brothers” in Greek. “T'adelfia” is a little gem, completely refurbished, in a green Mediterranean setting, where the prominent shade of yellow will remind you of the true colours of the island of Corfu.`}</p>
        <p className={styles.p}>{`Each apartment opens up to the pool with splendid views and offer the opportunity to recharge, whether as a couple or amidst family or friends. To complete this idyllic picture, a number of quiet beaches, some of the most sought-after on the island, charming little tavernas by the water and foot trails for the more athletic are all just a stone-throw away.`}</p>
        <p className={styles.p}>{`Experience this atmosphere full of promises and enjoy yourself. We hope to welcome you soon to “T'adelfia” so you can discover first hand this enchanting place and become part of the story.`}</p>
    </div>
  )
}

export default Welcome;
