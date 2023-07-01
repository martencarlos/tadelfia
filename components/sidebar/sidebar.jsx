"use client"

import React from 'react'
import styles from './sidebar.module.css'

import Link from 'next/link'
import { signOut,useSession } from "next-auth/react";

function Sidebar() {
    console.log("sidebar")
    const {data} = useSession()
    
    function toggleSidebar() {
        console.log("toggle")
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
        <button className={styles.sidebarButton} id='sidebarButton' onClick={toggleSidebar}>&#9776;</button>
        <div className={styles.sidebarPanel} id="sidebarPanel">
            <div className={styles.sidebarPanelTop}>
                <button className={styles.sidebarButtonInline} onClick={toggleSidebar}>&#9776;</button>
                <div className={styles.sidebarTitle}>{data.user.name}</div>
                <Link onClick={toggleSidebar} className={styles.sidebarLink} href="/dashboard">Dashboard</Link>
                <Link onClick={toggleSidebar} className={styles.sidebarLink} href="/dashboard/bookings">Bookings</Link>
                <Link onClick={toggleSidebar} className={styles.sidebarLink} href="#">CMS</Link>
                <Link onClick={toggleSidebar} className={styles.sidebarLink} href="#">Settings</Link>
            </div>
            <div className={styles.sidebarPanelBottom}>
                <div onClick={signOut} className={styles.sidebarLink} >Logout</div>
            </div>
        </div>

    </div>
  )
}

export default Sidebar