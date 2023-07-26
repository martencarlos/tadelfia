"use client"


import styles from './sidebar.module.css'

import Link from 'next/link'
import { signOut,useSession } from "next-auth/react";
import { useSelectedLayoutSegment } from "next/navigation";

function Sidebar() {
  
    const {data} = useSession()
    const activeSegment = useSelectedLayoutSegment()

    
    function toggleSidebar() {
    
        const sidebar = document.getElementById("sidebarPanel")
        const sidebarButton = document.getElementById("sidebarButton")
        if(sidebar.style.display === "flex"){
            sidebar.style.display = "none"
            sidebarButton.style.display = "block"
        }else{
            sidebar.style.display = "flex"
            sidebarButton.style.display = "none"
        }
    }

  return (
    <div className={styles.sidebar}>
        {/* hidden on desktop */}
        <button className={styles.sidebarButton} id='sidebarButton' onClick={toggleSidebar}>&#9776;</button>

        <div className={styles.sidebarPanel} id="sidebarPanel">
            <div className={styles.sidebarPanelTop}>
                {/* hidden on desktop */}
                <button className={styles.sidebarButtonInline} onClick={toggleSidebar}>&#9776;</button>

                <div className={styles.sidebarTitle}>{data.user.name}</div>
                
                <Link onClick={toggleSidebar} className={styles.sidebarLink} href="/dashboard"
                    style={{ 
                        fontWeight: activeSegment === null ? "bolder" : "normal",
                        backgroundColor: activeSegment === null ? "rgb(240 240 240)" : "white" 
                    }}
                >
                    Dashboard
                </Link>
                <Link 
                    style={{ 
                        fontWeight: activeSegment === "bookings" ? "bolder" : "normal" ,
                        backgroundColor: activeSegment === "bookings" ? "rgb(240 240 240)" : "white" 
                    }}
                    onClick={toggleSidebar} className={styles.sidebarLink} href="/dashboard/bookings">
                    Bookings
                </Link>

                <Link 
                    style={{ 
                        fontWeight: activeSegment === "blog" ? "bolder" : "normal" ,
                        backgroundColor: activeSegment === "blog" ? "rgb(240 240 240)" : "white" 
                    }}
                    onClick={toggleSidebar} className={styles.sidebarLink} href="/dashboard/blog">
                    CMS
                </Link>

                {/*<Link onClick={toggleSidebar} className={styles.sidebarLink} href="#">CMS</Link>
                <Link onClick={toggleSidebar} className={styles.sidebarLink} href="#">Settings</Link>*/}
            </div>
            <div className={styles.sidebarPanelBottom}>
                <div onClick={signOut} className={styles.sidebarLink}>Logout</div>
            </div>
        </div>

    </div>
  )
}

export default Sidebar