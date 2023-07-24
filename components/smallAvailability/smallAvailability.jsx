"use client";


import styles from "./smallAvailability.module.css";
import "./component.css";
import { useEffect, useState } from "react";
import { getAllBookings, getAllBookingRanges } from "@/lib/booking";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { CircularProgress } from "@mui/material";
import { pink } from "@mui/material/colors";


function SmallAvailability({ villa }) {
  // const size = useWindowSize();
  const [ranges, setRanges] = useState([]); // Booked ranges
  

  useEffect(() => {
    
    if (villa !== "Villa") {

      getAllBookingRanges().then((data) => {
        
        if (data.length > 0) {
          const bookedRanges = data.map((booking) => {
            if(booking.accomodation.villa === villa || booking.accomodation.villa === "Villa"){
              
              const checkin = new Date(booking.accomodation.checkin);
              const checkout = new Date(booking.accomodation.checkout);
              return [
                new Date( checkin.getFullYear(), checkin.getMonth(), checkin.getDate()),
                new Date( checkout.getFullYear(), checkout.getMonth(), checkout.getDate()),
              ];
            }
          });
        
          setRanges(...ranges, bookedRanges);
        }
      });

    
    } else {
      getAllBookingRanges(new Date().getFullYear()).then((data) => {
        if (data.length > 0) {
          const bookedRanges = data.map((booking) => {
            const checkin = new Date(booking.accomodation.checkin);
            const checkout = new Date(booking.accomodation.checkout);
            return [
              new Date(
                checkin.getFullYear(),
                checkin.getMonth(),
                checkin.getDate()
              ),
              new Date(
                checkout.getFullYear(),
                checkout.getMonth(),
                checkout.getDate()
              ),
            ];
          });
          setRanges(...ranges, bookedRanges);
        }
      });
    }
  }, []);

 
  return (
    <div className={styles.availability}>
      {/*} <h1 className={styles.h1}>Availability</h1>*/}
      {ranges.length > 0 ? (
        <Calendar
          minDate={new Date()}
          showFixedNumberOfWeeks={true}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              if (
                ranges.find(
                  (x) =>
                    x !== undefined && x[0].setHours(0, 0, 0, 0) <= date.setHours(0, 0, 0, 0) &&
                    x[1].setHours(0, 0, 0, 0) >= date.setHours(0, 0, 0, 0)
                )
              ) {
                return "highlight";
              }
            }
          }}
        />
      ):
        <div className={styles.loadingCalendar}>
          <CircularProgress
          className={styles.circle}
          />
        </div>
      }
    </div>
  );
}

export default SmallAvailability;
