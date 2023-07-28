"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useWindowSize } from "@/hooks/windowSize";

import styles from "./fullAvailability.module.css";
import "./component.css";
import { useEffect, useState } from "react";
import { getAllBookingRanges } from "@/lib/booking";

function FullAvailability() {
  const size = useWindowSize();
  const [ranges, setRanges] = useState([]); // Booked ranges
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const newRanges = [];
  //   getAllBookingRanges(new Date().getFullYear()).then((data) => {
  //     const minDate = new Date();
  //     let maxDate = new Date();
  //     let loopDate = new Date();
     

  //     data.map((booking) => {
  //       if (new Date(booking.accomodation.checkout) > maxDate) {
  //         maxDate = new Date(booking.accomodation.checkout);
  //       }
  //     });

  //     while (loopDate < maxDate) {
  //       // while (loopDate < (minDate.getDate() + 3)) {

  //       let bookedRanges = [];
  //       for (let i = 0; i < data.length; i++) {
  //         if (
  //           new Date(data[i].accomodation.checkin).toLocaleDateString() <=
  //             loopDate.toLocaleDateString() &&
  //           new Date(data[i].accomodation.checkout).toLocaleDateString() >=
  //             loopDate.toLocaleDateString()
  //         ) {
  //           bookedRanges.push({
  //             startDate: new Date(loopDate),
  //             endDate: new Date(loopDate),
  //             color: "#ffc0cb",
  //             key: data[i]._id,
  //           });
  //         }
  //       }

  //       if (bookedRanges.length === 8) 
  //         newRanges.push(bookedRanges[0]);

  //       loopDate.setDate(loopDate.getDate() + 1);
  //     }
  //     console.log("newRanges");
  //     console.log(newRanges);
  //     setRanges(newRanges);
  //   });
  // }, []);


  useEffect(() => {
    const newRanges = [];
    getAllBookingRanges(new Date().getFullYear()).then((data) => {
      if (data.length > 0) {
        data.forEach(booking => {
          const loop = new Date(booking.accomodation.checkin);
          const end = new Date(booking.accomodation.checkout);
          while(loop.setHours(0,0,0,0) <= end.setHours(0,0,0,0)){
          
          const res=data.filter(o => new Date(o["accomodation"]["checkin"]).setHours(0,0,0,0) <=loop.setHours(0,0,0,0) && new Date(o["accomodation"]["checkout"]).setHours(0,0,0,0)>=loop.setHours(0,0,0,0))
          if(res.length===7){
            // console.log(new Date(loop).toLocaleDateString())
            newRanges.push({
              startDate: new Date(loop),
              endDate: new Date(loop),
              color: "#ffc0cb",
              key: booking._id+"-"+loop.setHours(0,0,0,0)
            });
          }         
          loop.setDate(loop.getDate() + 1);
          }
          
        });
        setRanges(newRanges);
      }

      // if (data.length > 0) {
      //   const bookedRanges = data.map((booking) => {
      //     return {
      //       startDate: new Date(booking.accomodation.checkin),
      //       endDate: new Date(booking.accomodation.checkout),
      //       color: "#ffc0cb",
      //       key: booking._id,
      //     };
      //   });
      //   newRanges.push(...bookedRanges);
      //   setRanges(newRanges);
      // }
    });
  }, []);

  return (
    // !loading ?
    <div className={styles.availability}>
      <h1 className={styles.h1}>Availability of all apartments</h1>
      <br />

      <br />
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
