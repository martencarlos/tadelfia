import React from 'react'
import styles from './page.module.css'
import { serverGetAllBookings } from '@/lib/booking'

async function Bookings() {

    const allBookings = await serverGetAllBookings()

    return (
    <div className={styles.bookings}>
        <h1>Bookings</h1>
        <div className={styles.bookingsList}>
            {allBookings.map((booking) => (
                <div key={booking._id} className={styles.booking}>
                    {booking.contact.firstName}
                </div>
            ))}
        </div>
                    
    </div>
    )
}

export default Bookings