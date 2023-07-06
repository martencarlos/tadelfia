"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
// import { useWindowSize } from "@/hooks/windowSize";

import styles from "./smallAvailability.module.css";
import "./component.css";
import { use, useEffect, useState } from "react";
import { getYearBookingsFromVilla, getAllBookingRanges } from "@/lib/booking";


const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
function simulateMouseClick(element){
  mouseClickEvents.forEach(mouseEventType =>
    element.dispatchEvent(
      new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1
      })
    )
  );
}

function SmallAvailability({ villa }) {
  // const size = useWindowSize();
  const [ranges, setRanges] = useState([]); // Booked ranges

  useEffect(() => {
    const newRanges = [];
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
  }, []);
 
  useEffect(() => {
    const calendar = document.getElementsByClassName("rdrDays");
    
    console.log(calendar)
    setTimeout(() => {
      if(calendar){
        for (let i = 0; i < calendar.length; i++) {
          simulateMouseClick(calendar[i]);
        }
        
      }
    }, 1000);
    
  }, [ranges]);
 
  return ( 
    <div className={styles.availability} >
      {/*} <h1 className={styles.h1}>Availability</h1>*/}
      {ranges.length >0 && <DateRange
        onChange={(calendar) => {console.log("change")}}
        moveRangeOnFirstSelection={false}
        fixedHeight={true}
        shownDate={new Date()}
        editableDateInputs={false}
        showPreview={false}
        autofocus={true}
        showDateDisplay={false}
        dragSelectionEnabled={false}
        months={1}
        direction="horizontal"
        ranges={ranges}
        weekStartsOn={1}
        minDate={new Date()}
      />}
    </div>

  );
}

export default SmallAvailability;

