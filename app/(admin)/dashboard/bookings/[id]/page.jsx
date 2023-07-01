import React from "react";
import styles from "./page.module.css";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";

async function BookingPage({ searchParams, params }) {
  console.log(params);
  dbConnect();
  const booking = await Booking.findOne({ _id: params.id });
  console.log("********************************booking********************************")
  console.log(booking);

  return (
    <div className={styles.bookingPage}>
      <h1>Booking Details</h1>
      <div className={styles.bookingInfo}>
        <br />
        <div className={styles.section}>
          <h3>Contact</h3>
          <br />
          <p>{booking.contact.firstName}</p>
          <p>{booking.contact.lastName}</p>
          <p>{booking.contact.email}</p>
          <p>{booking.contact.phone}</p>
        </div>
        <br />
        <div className={styles.section}>
          <h3>Address</h3>
          <br />
          <p>{booking.address.street}</p>
          <p>{booking.address.postal}</p>
          <p>{booking.address.towncity}</p>
          <p>{booking.address.country}</p>
        </div>
        <br />
        <div className={styles.section}>
          <h3>Accomodation</h3>
          <br />
          <p>{booking.accomodation.villa}</p>
          <p>{booking.accomodation.messageToHost}</p>
          <p>{new Date(booking.accomodation.checkin).toLocaleDateString()}</p>
          <p>{new Date(booking.accomodation.checkout).toLocaleDateString()}</p>
          <p>{"Nights: " + booking.accomodation.nights}</p>
          <p>{"Guests: " + booking.accomodation.guests}</p>
          <br />
        </div>
        <div className={styles.section}>
          <h3>Payment</h3>
          <br />
          <p>{booking.payment.id}</p>
          <p>{booking.payment.currency+" "+booking.payment.amount}</p>
      
          <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
          <br />
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
