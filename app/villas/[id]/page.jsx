import React from 'react'
import styles from './page.module.css'

function Villa({ params }) {
  return (
    <div className={styles.villa}>
      <h1>{params.id}</h1>
    </div>
  )
}

export default Villa