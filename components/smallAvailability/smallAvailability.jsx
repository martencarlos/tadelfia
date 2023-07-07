"use client";


import styles from "./smallAvailability.module.css";
import "./component.css";
import { useEffect, useState } from "react";
import { getYearBookingsFromVilla, getAllBookingRanges } from "@/lib/booking";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

function SmallAvailability({ villa }) {
  // const size = useWindowSize();
  const [ranges, setRanges] = useState([]); // Booked ranges

  useEffect(() => {
    const newRanges = [];
    if (villa !== "Villa") {
      getYearBookingsFromVilla(new Date().getFullYear(), "Villa").then(
        (data) => {
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
            // newRanges.push(...bookedRanges);
          }
        }
      );

      getYearBookingsFromVilla(new Date().getFullYear(), villa).then((data) => {
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
      {ranges.length > 0 && (
        <Calendar
          minDate={new Date()}
          showFixedNumberOfWeeks={true}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              if (
                ranges.find(
                  (x) =>
                    x[0].setHours(0, 0, 0, 0) <= date.setHours(0, 0, 0, 0) &&
                    x[1].setHours(0, 0, 0, 0) >= date.setHours(0, 0, 0, 0)
                )
              ) {
                return "highlight";
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default SmallAvailability;
