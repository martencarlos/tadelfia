"use client"
import React from 'react'
import styles from './navbar.module.css'
import  './navbar.css'
import Link from 'next/link'
import { BsArrowDownShort } from "react-icons/bs";


function Navbar() {

    function villasDropdownButtonClick() {
        let villasMenu = document.getElementById("villasMenu");
        if (villasMenu.style.display === "none" || villasMenu.style.display === "") 
            villasMenu.style.display = "block";
        else 
            villasMenu.style.display = "none";
    }
    function hambMenuClick(){
        var x = document.getElementById("hamb-menu");
        
        var icon = document.getElementById("hamb-zone");
        icon.classList.toggle("openHambMenu");
        
        if (x.style.display === "flex") {
           x.style.display = "none";
            
        } else {
            x.style.display = "flex";
        }

    }

  return (
    <nav className={styles.navbar}>
        <ul className={styles.links}>
            <li className={styles.link}><Link href="/">Home</Link></li>
            <li className={styles.dropdownLink} onClick={villasDropdownButtonClick}>
                Villas <BsArrowDownShort className={styles.icon}/>
                {/*Villas Menu - hidden*/}
                <div id="villasMenu" className={styles.villasMenu}>
                    <ul className={styles.menuLinks}>
                        <li className={styles.menuLink}><Link href="/villas/villa">Villa</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/Eros">Eros</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/Galini">Galini</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/Iris">Iris</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/Astraia">Astraia</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/Armonia">Armonia</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/Gaia">Gaia</Link></li>
                        <li className={styles.menuLink}><Link href="/villas/Ermis">Ermis</Link></li>
                    </ul>
                </div>

            </li>
            <li className={styles.link}><Link href="/about">About</Link></li>
            <li className={styles.link}><Link href="/contact">Contact</Link></li>
        </ul>
        <div id="hamb-zone" className={styles.hambMenuIcon} onClick={hambMenuClick}>
            <div className={styles.bar1}></div>
            <div className={styles.bar2}></div>
            <div className={styles.bar3}></div>
        </div>
        <div id="hamb-menu" className={styles.hambMenu}>
            <ul className={styles.menuLinks}>
                <li className={styles.link}><Link href="/">Home</Link></li>
                <li className={styles.menuLink}><Link href="/villas/1">Villa</Link></li>
                <li className={styles.menuLink}><Link href="/villas/2">Eros</Link></li>
                <li className={styles.menuLink}><Link href="/villas/3">Galini</Link></li>
                <li className={styles.menuLink}><Link href="/villas/4">Iris</Link></li>
                <li className={styles.menuLink}><Link href="/villas/5">Astraia</Link></li>
                <li className={styles.menuLink}><Link href="/villas/6">Armonia</Link></li>
                <li className={styles.menuLink}><Link href="/villas/7">Gaia</Link></li>
                <li className={styles.menuLink}><Link href="/villas/8">Ermis</Link></li>
                <li className={styles.link}><Link href="/about">About</Link></li>
                <li className={styles.link}><Link href="/contact">Contact</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar