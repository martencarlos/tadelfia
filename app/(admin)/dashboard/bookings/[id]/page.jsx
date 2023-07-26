

import styles from "./page.module.css";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
// import { Router } from "next/router";


// Dynamic metadata
export async function generateMetadata({ params }) {
  return { title: params.id, description: "Apartment full information" };
}

async function BookingPage({ searchParams, params }) {

  dbConnect();
  const booking = await Booking.findOne({ _id: params.id });
  
  return (
    <div className={styles.bookingPage}>
      <div className={styles.header}>
        {/*} <button onClick={() => Router.back()}>Back</button>*/}
        <h1>Booking Details</h1>
      </div>
      <div className={styles.bookingInfo}>
   
        <div className={styles.sectionRow}>
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
        </div>

      
        <div className={styles.sectionRow}>
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
          <p>{booking.payment.currency+" "+booking.payment.amount/100}</p>
      
          <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
          <br />
        </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
