import React from 'react'
import styles from './page.module.css'

function Success({searchParams, params}) {
    console.log(searchParams);
  return (
    <div className={styles.success}>
        <h1>Payment {searchParams.redirect_status}!</h1>
    </div>
  )
}

export default Success