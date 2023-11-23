"use client";


import styles from "./smallAvailability.module.css";
import "./component.css";
import { useEffect, useState } from "react";
import {  getAllBookingRanges } from "@/lib/booking";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { CircularProgress } from "@mui/material";
// import { pink } from "@mui/material/colors";


function SmallAvailability({ villa }) {
  // const size = useWindowSize();
  const [ranges, setRanges] = useState([]); // Booked ranges
  const [error, setError] = useState(null); // Error message
  

  useEffect(() => {
    
    if (villa !== "Villa") {

      getAllBookingRanges().then((data) => {

        if (data.error) 
          setError(data.error);
        
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
        if (data.error) 
          setError(data.error);

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
            let classes = []

            if (view === "month") {
              if (
                ranges.find(
                  (x) =>
                    x !== undefined && x[0].setHours(0, 0, 0, 0) <= date.setHours(0, 0, 0, 0) &&
                    x[1].setHours(0, 0, 0, 0) >= date.setHours(0, 0, 0, 0)
                )
              ) {
                classes.push("highlight");
              }
              if (
                ranges.find(
                  (x) =>
                    x !== undefined && x[0].setHours(0, 0, 0, 0) < date.setHours(0, 0, 0, 0) &&
                    x[1].setHours(0, 0, 0, 0) > date.setHours(0, 0, 0, 0) 
                )
              ) {
                classes.push("middle");
              }
              if (
                ranges.find(
                  (x) =>
                    x !== undefined && x[0].setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
                )
              ) {
                classes.push("start");
              }
              if (
                ranges.find(
                  (x) =>
                    x !== undefined && x[1].setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
                )
              ) {
                classes.push("end");
                
              }
              return classes;
            }
          }}
        />
      ):
        <div className={styles.loadingCalendar}>
          { !error ? <CircularProgress className={styles.circle}/>
          : <p className={styles.error}>{error}</p>
          }
        </div>
      }
    </div>
  );
}

export default SmallAvailability;
