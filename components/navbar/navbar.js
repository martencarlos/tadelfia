"use client"
import React from 'react'
import styles from './navbar.module.css'
import  './navbar.css'
import Link from 'next/link'
import { BsArrowDownShort } from "react-icons/bs";
import { useSelectedLayoutSegment } from 'next/navigation'

function Navbar() {

    const activeSegment = useSelectedLayoutSegment()
    
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
    function closeHambMenu(){
        hambMenuClick()
    }


  return (
    <nav className={styles.navbar}>
        <ul className={styles.links}>
            <Link style={{fontWeight: (activeSegment === null) ? 'bolder' : 'normal'}}  
                className={styles.link} href="/"><li >Home</li></Link>
            <li className={styles.dropdownLink} onClick={villasDropdownButtonClick}>
                Villas <BsArrowDownShort className={styles.icon}/>
                
                {/*Villas Menu - hidden*/}
                <div id="villasMenu" className={styles.villasMenu}>
                    <ul className={styles.menuLinks}>
                        <Link href="/villas/villa" className={styles.menuLink}><li >Villa</li></Link>
                        <Link href="/villas/Eros" className={styles.menuLink}><li >Eros</li></Link>
                        <Link href="/villas/Galini" className={styles.menuLink}><li >Galini</li></Link>
                        <Link href="/villas/Iris" className={styles.menuLink}><li >Iris</li></Link>
                        <Link href="/villas/Astraia" className={styles.menuLink}><li >Astraia</li></Link>
                        <Link href="/villas/Armonia" className={styles.menuLink}><li >Armonia</li></Link>
                        <Link href="/villas/Gaia" className={styles.menuLink}><li >Gaia</li></Link>
                        <Link href="/villas/Ermis" className={styles.menuLink}><li >Ermis</li></Link>
                    </ul>
                </div>

            </li>
            <Link 
                style={{fontWeight: (activeSegment === "about") ? 'bolder' : 'normal'}}  
                className={styles.link} 
                href="/about">
                <li >About</li>
            </Link>
            <Link style={{fontWeight: (activeSegment === "contact") ? 'bolder' : 'normal'}}  
            className={styles.link} href="/contact"><li >Contact</li></Link>
          
        </ul>
        <div id="hamb-zone" className={styles.hambMenuIcon} onClick={hambMenuClick}>
            <div className={styles.bar1}></div>
            <div className={styles.bar2}></div>
            <div className={styles.bar3}></div>
        </div>
        <div id="hamb-menu" className={styles.hambMenu}>
            <ul onClick={closeHambMenu} className={styles.menuLinks}>
                <Link className={styles.link} href="/"><li >Home</li></Link>
                <Link href="/villas/villa" className={styles.menuLink}><li >Villa</li></Link>
                <Link href="/villas/Eros" className={styles.menuLink}><li >Eros</li></Link>
                <Link href="/villas/Galini" className={styles.menuLink}><li >Galini</li></Link>
                <Link href="/villas/Iris" className={styles.menuLink}><li >Iris</li></Link>
                <Link href="/villas/Astraia" className={styles.menuLink}><li >Astraia</li></Link>
                <Link href="/villas/Armonia" className={styles.menuLink}><li >Armonia</li></Link>
                <Link href="/villas/Gaia" className={styles.menuLink}><li >Gaia</li></Link>
                <Link href="/villas/Ermis" className={styles.menuLink}><li >Ermis</li></Link>
                <Link className={styles.link} href="/about"><li >About</li></Link>
                <Link className={styles.link} href="/contact"><li >Contact</li></Link>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar