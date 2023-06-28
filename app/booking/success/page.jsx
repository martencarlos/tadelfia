import React from 'react'
import styles from './page.module.css'
import dbConnect from '@/lib/dbConnect'
import Booking from '@/models/Booking'

async function saveBooking (booking,data) {
  console.log("saving booking")
  await dbConnect();
  //add payment info to the booking
  booking.payment ={
    id: data.id,
    amount: data.amount,
    currency: data.currency
  }
  //save booking to db
  const newBooking = new Booking(booking);
  await newBooking.save();
  
  console.log(booking)



}

async function Success ({searchParams, params}) {
    
    const res = await fetch ("https://api.stripe.com/v1/payment_intents/"+searchParams.payment_intent,
    {
      method: "GET",
      headers: {
        authorization: "Bearer "+process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
      }
    })
    const data = await res.json();
    const booking = JSON.parse(data.metadata.booking);
    
    await saveBooking(booking,data);
   
    
  return (
    <div className={styles.success}>
    <h1>Booking Details</h1>
      <div className={styles.bookingInfo}>
        
        <br/>
        <div className={styles.section}>
          <h3>Contact</h3>
          <br/>
          <p>{booking.contact.firstName}</p>
          <p>{booking.contact.lastName}</p>
          <p>{booking.contact.email}</p>
          <p>{booking.contact.phone}</p>
        </div>
        <br/>
        <div className={styles.section}>
        <h3>Address</h3>
        <br/>
        <p>{booking.address.street}</p>
        <p>{booking.address.postal}</p>
        <p>{booking.address.towncity}</p>
        <p>{booking.address.country}</p>
        </div>
        <br/>
        <div className={styles.section}>
        <h3>Accomodation</h3>
        <br/>
        <p>{booking.accomodation.villa}</p>
        <p>{booking.accomodation.MessageToHost}</p>
        <p>{booking.accomodation.checkin}</p>
        <p>{booking.accomodation.checkout}</p>
        <p>{"Nights: "+booking.accomodation.nights}</p>
        <p>{"Guests: "+booking.accomodation.guests}</p>
        <br/>
        </div>
        <div className={styles.section}>
        <h3>Payment</h3>
        <br/>
        <p>{"id: "+data.id}</p>
        <p>{data.amount+" "+ data.currency}</p>
        </div>
      </div>
      {/* <div className={styles.paymentContainer}>
        <h1>Payment full Details </h1>
        <pre className={styles.json}>{JSON.stringify(data, null, 2) }</pre> 
      </div>
      */}
    </div>
  )
}

export default Success