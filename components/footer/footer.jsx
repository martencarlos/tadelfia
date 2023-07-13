"use client"

import styles from "./footer.module.css"
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Footer(){
    const activeSegment = useSelectedLayoutSegment();
    
    const year= new Date().getFullYear()

    return (
        activeSegment !== "(admin)" &&<footer id="footer" className={styles.footer} >
            <h3 id="footer-brand" variant="body1"  className={styles.footerBrand}>
                © {year} Tadelfia S.A.
            </h3>

            <ul id="footer-links" className={styles.footerLinks}>
        
                <li className={styles.navItem}>
                    <Link underline="hover" href="/policy#top">Policy</Link>
                </li>
                <li className={styles.navItem}>
                    <Link underline="hover" href="/about#top" >About</Link>
                </li>
                <li className={styles.navItem}>
                    <Link underline="hover" href="/contact#top">Contact</Link>
                </li>
            </ul>
        </footer>
    )
}