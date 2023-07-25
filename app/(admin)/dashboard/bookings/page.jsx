import styles from "./page.module.css";
// import { serverGetAllBookings } from '@/lib/booking'
import Link from "next/link";


// Static metadata
export const metadata = {
  title: "Bookings", description: "Tadelfia full list of bookings" 
}

export default async function Bookings() {
  let allBookings = [];
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/bookings", {
      next: { revalidate: 10 },
    });
    allBookings = await res.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <div className={styles.bookings}>
      <div className={styles.header}>
        <h1>Bookings</h1>
        {allBookings.length === 0 && <div>No bookings yet</div>}
      </div>
      <div className={styles.bookingsList}>
        <div className={styles.bookingHeader}>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <h3>Index</h3>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <h3>Booking Nº</h3>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <h3>Apartment</h3>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <h3>Check-in/out</h3>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <h3>Accomodation</h3>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <h3>Payment</h3>
            </div>
          </div>
        </div>
        {allBookings.map((booking, i) => (
          <Link
            href={"/dashboard/bookings/" + booking._id}
            key={booking._id}
            className={styles.booking}
          >
            <div className={styles.section}>
              
                <h3>{"#" + i}</h3>
              
            </div>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h3>Booking Nº</h3>
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.elipsis}>
                  {" "}
                  {"# " + booking.payment.id.slice(-6)}
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h3>Apartment</h3>
              </div>
              <div className={styles.sectionContent}>
                <div>{booking.accomodation.villa}</div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h3>Check-in/out</h3>
              </div>
              <div className={styles.sectionContent}>
                <div>
                  {new Date(booking.accomodation.checkin).toLocaleDateString()}
                </div>
                <div>
                  {new Date(booking.accomodation.checkout).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h3>Accomodation</h3>
              </div>
              <div className={styles.sectionContent}>
                <div>{booking.accomodation.nights + " nights"}</div>
                <div>{booking.accomodation.guests + " guests"}</div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>
                <h3>Payment</h3>
              </div>
              <div className={styles.sectionContent}>
                <div>{new Date(booking.createdAt).toLocaleDateString()}</div>
                <div>
                  {booking.payment.currency === "eur"
                    ? "€ " + booking.payment.amount/100
                    : booking.payment.currency + " " + booking.payment.amount/100}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
