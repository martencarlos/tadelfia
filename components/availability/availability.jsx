"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useWindowSize } from "@/hooks/windowSize";

import styles from "./availability.module.css";
import "./component.css";
import { useEffect, useState } from "react";
import { getAllBookingRanges } from "@/lib/booking";
import { use } from "react";

function Availability({ villa }) {
  const size = useWindowSize();
  const [ranges, setRanges] = useState([]); // Booked ranges
  const [error, setError] = useState(null); // Error message
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newRanges = [];
    //get all bookings from "Villa" (whole property) 
    if(villa !== "Villa"){
      getAllBookingRanges().then((data) => {
        if (data.error) setError(data.error);
        
        if (data.length > 0) {
          const bookedRanges = data.map((booking) => {
            if(booking.accomodation.villa === villa || booking.accomodation.villa === "Villa"){
              return {
                startDate: new Date(booking.accomodation.checkin),
                endDate: new Date(booking.accomodation.checkout),
                color: "#ffc0cb",
                key: booking._id,
              };
            }
          });
        
          setRanges(...ranges, bookedRanges.filter((range) => range !== undefined));
        }
      });

    }else{
      getAllBookingRanges(new Date().getFullYear()).then((data) => {
        if (data.error) setError(data.error);
        if (data.length > 0) {
          const bookedRanges = data.map((booking) => {
            return {
              startDate: new Date(booking.accomodation.checkin),
              endDate: new Date(booking.accomodation.checkout),
              color: "#ffc0cb",
              key: booking._id,
            };
          });
          newRanges.push(...bookedRanges);
          setRanges(newRanges);
        }
      });
    }

    
  }, [villa]);

  useEffect(() => {
    // console.log(ranges);
  }, [ranges]);

  // useEffect(() => {
  //   setLoading(false);
  // }, [ranges]);

  return ( // !loading ? 
    !error ? <div className={styles.availability}>
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
    : <div className={styles.availability}>
      <h1 className={styles.h1}>{error}</h1>
    </div>
  //  : 
  //   <div className={styles.availability}>
  //     <h1 className={styles.h1}>Loading availability...</h1>
  //   </div>
  );
}

export default Availability;
