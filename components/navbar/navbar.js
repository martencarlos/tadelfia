"use client"
import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'
import { BsArrowDownShort } from "react-icons/bs";


function Navbar() {

    function villasMenu() {
        let villasMenu = document.getElementById("villasMenu");
        if (villasMenu.style.display === "none" || villasMenu.style.display === "") 
            villasMenu.style.display = "block";
        else 
            villasMenu.style.display = "none";
    }

  return (
    <nav className={styles.navbar}>
        <ul className={styles.links}>
            <li className={styles.link}><Link href="/">Home</Link></li>
            <li className={styles.dropdownLink} onClick={villasMenu}>
                Villas <BsArrowDownShort className={styles.icon}/>
                {/*Villas Menu - hidden*/}
                <div id="villasMenu" className={styles.villasMenu}>
                    <ul className={styles.menuLinks}>
                        <li className={styles.menuLink}><Link href="/villas/1">Villa</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/2">Eros</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/3">Galini</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/4">Iris</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/5">Astraia</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/6">Armonia</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/7">Gaia</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/8">Ermis</Link></li>
                    </ul>
                </div>

            </li>
            <li className={styles.link}><Link href="/about">About</Link></li>
            <li className={styles.link}><Link href="/contact">Contact</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar