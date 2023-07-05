"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useWindowSize } from "@/hooks/windowSize";

import styles from "./fullAvailability.module.css";
import "./component.css";
import { useEffect, useState } from "react";
import { getAllBookings } from "@/lib/booking";

function FullAvailability() {
  const size = useWindowSize();
  const [ranges, setRanges] = useState([]); // Booked ranges
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newRanges = [];
    getAllBookings(new Date().getFullYear()).then((data) => {
     
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
  }, []);

  // useEffect(() => {
  //   setLoading(false);
  // }, [ranges]);

  return ( // !loading ? 
    <div className={styles.availability}>
      <h1 className={styles.h1}>Availability of all apartments</h1>
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

export default FullAvailability;
