import React from 'react'
import styles from './page.module.css'

// Static metadata
export const metadata = {
  title: "Dashboard", description: "Tadelfia Admin Dashboard" 
}

function Dashboard() {
  return (
    <div className={styles.dashboard} >
        Dashboard
    </div>
  )
}

export default Dashboard