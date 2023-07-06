"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useWindowSize } from "@/hooks/windowSize";

import styles from "./availability.module.css";
import "./component.css";
import { useEffect, useState } from "react";
import { getYearBookingsFromVilla, getAllBookingRanges } from "@/lib/booking";

function Availability({ villa }) {
  const size = useWindowSize();
  const [ranges, setRanges] = useState([]); // Booked ranges
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newRanges = [];
    //get all bookings from "Villa" (whole property) 
    if(villa !== "Villa"){
      getYearBookingsFromVilla(new Date().getFullYear(), "Villa").then((data) => {
        if (data.length > 0) {
          const bookedRanges = data.map((booking) => {
            return {
              startDate: new Date(booking.accomodation.checkin),
              endDate: new Date(booking.accomodation.checkout),
              color: "#d11a2a",
              key: booking._id,
            };
          });
          newRanges.push(...bookedRanges);
        }
      });

      //get all bookings from specific Apartment
      getYearBookingsFromVilla(new Date().getFullYear(), villa).then((data) => {
        if (data.length > 0) {
          const bookedRanges = data.map((booking) => {
            return {
              startDate: new Date(booking.accomodation.checkin),
              endDate: new Date(booking.accomodation.checkout),
              color: "#d11a2a",
              key: booking._id,
            };
          });
          newRanges.push(...bookedRanges);
          setRanges(newRanges);
        }
      });
    }else{
      getAllBookingRanges(new Date().getFullYear()).then((data) => {
        if (data.length > 0) {
          const bookedRanges = data.map((booking) => {
            return {
              startDate: new Date(booking.accomodation.checkin),
              endDate: new Date(booking.accomodation.checkout),
              color: "#d11a2a",
              key: booking._id,
            };
          });
          newRanges.push(...bookedRanges);
          setRanges(newRanges);
        }
      });
    }

    
  }, [villa]);

  // useEffect(() => {
  //   setLoading(false);
  // }, [ranges]);

  return ( // !loading ? 
    <div className={styles.availability}>
      <h1 className={styles.h1}>Availability</h1>
      <DateRange
        onChange={(item) => {}}
        moveRangeOnFirstSelection={false}
        fixedHeight={true}
        shownDate={new Date()}
        editableDateInputs={false}
        showPreview={false}
        
        showDateDisplay={false}
        dragSelectionEnabled={false}
        months={size.width < 800 ? 1 : 2}
        direction="horizontal"
        ranges={ranges}
        weekStartsOn={1}
        minDate={new Date()}
      />
    </div>
  //  : 
  //   <div className={styles.availability}>
  //     <h1 className={styles.h1}>Loading availability...</h1>
  //   </div>
  );
}

export default Availability;
