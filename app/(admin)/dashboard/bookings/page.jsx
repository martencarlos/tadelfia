import React from 'react'
import styles from './page.module.css'
// import { serverGetAllBookings } from '@/lib/booking'
import Link from 'next/link'


async function serverGetAllBookings() {
    const res = await fetch(process.env.NEXT_PUBLIC_HOST+"/api/bookings", 
        { next: { revalidate: 0 } })
    if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
    
}


async function Bookings() {

    const allBookings = await serverGetAllBookings()
   
    return (
    <div className={styles.bookings}>
        <div className={styles.header}>
            <h1>Bookings</h1>
            {allBookings.length === 0 &&<div>
                No bookings yet
            </div>}
        </div>
        <div className={styles.bookingsList}>
            { allBookings.map((booking) => (
                <Link href={"/dashboard/bookings/"+booking._id} key={booking._id} className={styles.booking}>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <h3>Contact</h3>
                        </div>
                        <div className={styles.sectionContent}>
                            <div>{booking.contact.firstName}</div>
                            <div>{booking.contact.lastName}</div>
                            <div className={styles.elipsis}>{booking.contact.email}</div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <h3>Address</h3>
                        </div>
                        <div className={styles.sectionContent}>
                            <div className={styles.elipsis}>{booking.address.street}</div>
                            <div className={styles.elipsis}>{booking.address.postal}</div>
                            <div>{booking.address.towncity}</div>
                            <div>{booking.address.country}</div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <h3>Accomodation</h3>
                        </div>
                        <div className={styles.sectionContent}>
                            <div>{booking.accomodation.villa}</div>
                            <div>{new Date(booking.accomodation.checkin).toLocaleDateString()}</div>
                            <div>{new Date (booking.accomodation.checkout).toLocaleDateString()}</div>
                            <div>{booking.accomodation.nights+ " nights"}</div>
                            <div>{booking.accomodation.guests+ " guests"}</div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <h3>Payment</h3>
                        </div>
                        <div className={styles.sectionContent}>
                            <div className={styles.elipsis}>{booking.payment.id}</div>
                            <div>{new Date(booking.createdAt).toLocaleDateString()}</div>
                            <div>{booking.payment.currency+" "+booking.payment.amount}</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
                    
    </div>
    )
}

export default Bookings