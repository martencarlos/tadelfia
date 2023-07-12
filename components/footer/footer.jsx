
import "./footer.css";

import Link from "next/link";

export default function Footer(props){
    console.log("Rendering Footer")
    
    
    const year= new Date().getFullYear()

    return (
        <footer id="footer" className={props.darkMode ? "dark" : ""}>
            <h3 id="footer-brand" variant="body1"  className="footer-brand">
                © {year} Tadelfia S.A.
            </h3>

            <ul id="footer-links" className="footer-links">
        
                <li className="nav-item">
                    <Link underline="hover" href="/policy">Policy</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="/about" >About</Link>
                </li>
                <li className="nav-item">
                    <Link underline="hover" href="/contact">Contact</Link>
                </li>
            </ul>
        </footer>
    )
}