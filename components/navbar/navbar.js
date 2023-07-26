"use client";

import styles from "./navbar.module.css";
import "./navbar.css";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { useSelectedLayoutSegment } from "next/navigation";

function Navbar() {
  function openCloseAccordeon(e) {
    const accordeon = document.getElementsByClassName("accordeon");
    /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
    e.target.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
  const activeSegment = useSelectedLayoutSegment();
  function villasDropdownButtonClick() {
    let villasMenu = document.getElementById("villasMenu");
    if (villasMenu.style.display === "none" || villasMenu.style.display === "")
      villasMenu.style.display = "block";
    else villasMenu.style.display = "none";
  }
  function hambMenuClick() {
    var x = document.getElementById("hamb-menu");
    var icon = document.getElementById("hamb-zone");
    icon.classList.toggle("openHambMenu");

    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }
  function closeHambMenu(e) {
    if (e.target.tagName !== "BUTTON") {
      setTimeout(() => {
        hambMenuClick();
      }, 200);
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoDesktop}>
        <Link href="/">{"Τ'αδελφια"}</Link>
      </div>
      <ul className={styles.links}>
        <Link
          style={{ fontWeight: activeSegment === null ? "bolder" : "normal",
          borderBottom: activeSegment === null ? "3px solid #508143" : "3px solid transparent"
        }}
          className={styles.link}
          href="/"
        >
          <li>Home</li>
        </Link>
        <li className={styles.dropdownLink} onClick={villasDropdownButtonClick}
        style={{
          fontWeight: activeSegment === "villas" ? "bolder" : "normal",
          borderBottom: activeSegment === "villas" ? "3px solid #508143" : "3px solid transparent"
        }}>
          {/*<div>*/}
            Apartments
          {/*</div>*/}
          <BsChevronDown className={styles.icon} />

          {/*Villas Menu - hidden*/}
          <div id="villasMenu" className={styles.villasMenu}>
            <ul className={styles.menuLinks}>
              <Link href="/villas" className={styles.menuLink}>
                <li>Overview</li>
              </Link>
              <div className={styles.separator}></div>
              <Link href="/villas/Villa" className={styles.menuLink}>
                The Villa
              </Link>
              <Link href="/villas/Eros" className={styles.menuLink}>
                <li>Eros</li>
              </Link>
              <Link href="/villas/Galini" className={styles.menuLink}>
                <li>Galini</li>
              </Link>
              <Link href="/villas/Iris" className={styles.menuLink}>
                <li>Iris</li>
              </Link>
              <Link href="/villas/Astraia" className={styles.menuLink}>
                <li>Astraia</li>
              </Link>
              <Link href="/villas/Armonia" className={styles.menuLink}>
                <li>Armonia</li>
              </Link>
              <Link href="/villas/Gaia" className={styles.menuLink}>
                <li>Gaia</li>
              </Link>
              <Link href="/villas/Ermis" className={styles.menuLink}>
                <li>Ermis</li>
              </Link>
            </ul>
          </div>
        </li>
        <Link
          style={{
            fontWeight: activeSegment === "about" ? "bolder" : "normal",
            borderBottom: activeSegment === "about" ? "3px solid #508143" : "3px solid transparent"
          }}
          className={styles.link}
          href="/about"
        >
          <li>About</li>
        </Link>
        <Link
          style={{
            fontWeight: activeSegment === "contact" ? "bolder" : "normal",
            borderBottom: activeSegment === "contact" ? "3px solid #508143" : "3px solid transparent"
          }}
          className={styles.link}
          href="/contact"
        >
          <li>Contact</li>
        </Link>
      </ul>
      {/*Logo - hidden*/}
      <div className={styles.logo}>
        <Link href="/">{"Τ'αδελφια"}</Link>
      </div>
      {/*Hamburger Menu ICON - hidden*/}
      <div
        id="hamb-zone"
        className={styles.hambMenuIcon}
        onClick={hambMenuClick}
      >
        <div className={styles.bar1}></div>
        <div className={styles.bar2}></div>
        <div className={styles.bar3}></div>
      </div>
      <div id="hamb-menu" className={styles.hambMenu}>
        <ul onClick={closeHambMenu} className={styles.menuLinks}>
          <Link className={styles.hambMenuLink} href="/">
            <li>Home</li>
          </Link>

          <button onClick={openCloseAccordeon} className={styles.accordion}>
            Apartments
            {/* <BsArrowDownShort className={styles.icon}/>*/}
          </button>
          <div className={styles.panel}>
            <Link href="/villas" className={styles.hambMenuLink}>
              <li>Overview</li>
            </Link>
            <div className={styles.separator1}></div>
            <Link href="/villas/Villa" className={styles.hambMenuLink}>
              <li>Villa</li>
            </Link>
            <Link href="/villas/Eros" className={styles.hambMenuLink}>
              <li>Eros</li>
            </Link>
            <Link href="/villas/Galini" className={styles.hambMenuLink}>
              <li>Galini</li>
            </Link>
            <Link href="/villas/Iris" className={styles.hambMenuLink}>
              <li>Iris</li>
            </Link>
            <Link href="/villas/Astraia" className={styles.hambMenuLink}>
              <li>Astraia</li>
            </Link>
            <Link href="/villas/Armonia" className={styles.hambMenuLink}>
              <li>Armonia</li>
            </Link>
            <Link href="/villas/Gaia" className={styles.hambMenuLink}>
              <li>Gaia</li>
            </Link>
            <Link href="/villas/Ermis" className={styles.hambMenuLink}>
              <li>Ermis</li>
            </Link>
          </div>
          <div className={styles.separator1}></div>
          <Link className={styles.hambMenuLink} href="/about">
            <li>About</li>
          </Link>
          <Link className={styles.hambMenuLink} href="/contact">
            <li>Contact</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
