import React from 'react'
import styles from './page.module.css'

async function Success({searchParams, params}) {
    console.log(searchParams);
    const res = await fetch ("https://api.stripe.com/v1/payment_intents/"+searchParams.payment_intent,
    {
      method: "GET",
      headers: {
        authorization: "Bearer "+process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
      }
    })
    const data = await res.json();
    console.log(data);
    
  return (
    <div className={styles.success}>
        <h1>Payment {searchParams.redirect_status}!</h1>
        <br/>
        <p>Payment info:</p>
        <br/>
        <pre>{JSON.stringify(data, null, 2) }</pre>
    </div>
  )
}

export default Success