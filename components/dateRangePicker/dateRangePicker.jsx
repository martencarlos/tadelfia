
"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./dateRangePicker.module.css"
import "./component.css"

import DatePicker from "react-multi-date-picker"
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { getAllBookingRanges } from "@/lib/booking";
import "react-multi-date-picker/styles/layouts/mobile.css"
// import { useWindowSize } from "@/hooks/windowSize"


function DateRangePicker({rangeDates, setRangeDates,villa}) {
    const datePickerRef = useRef()
    // const { width } = useWindowSize()
    const [bookedRanges, setBookedRanges] = useState([]); // Booked ranges
  

  function isReserved(strDate) {
    let returnValue = false;
    
    if(bookedRanges.length>0){
      for (let i = 0; i < bookedRanges.length; i++) {
        // console.log("select date "+strDate.setHours(0,0,0,0))
        // console.log("start date "+new Date(bookedRanges[i][0]).setHours(0,0,0,0))
        // console.log("end date "+new Date(bookedRanges[i][1]).setHours(0,0,0,0))
        if(strDate >= (new Date(bookedRanges[i][0]).setHours(0,0,0,0)) && strDate<= (new Date(bookedRanges[i][1]).setHours(0,0,0,0))){
          return true;
        }
      };
    }
    return returnValue
  }

  useEffect(() => {
    const newRanges = [];
    if(villa !== "Villa"){
      getAllBookingRanges().then((data) => {
        if (data.length > 0) {
          const newBookedRanges = data.map((booking) => {
            if(booking.accomodation.villa === villa || booking.accomodation.villa === "Villa"){
              return [new Date(booking.accomodation.checkin),new Date(booking.accomodation.checkout)]
            }
          });
         
          setBookedRanges(...bookedRanges, newBookedRanges.filter((range) => range !== undefined));
        }
      });
    }else{
      getAllBookingRanges().then((data) => {
        if (data.length > 0) {
          const newBookedRanges = data.map((booking) => {
            return [new Date(booking.accomodation.checkin),new Date(booking.accomodation.checkout)]
          });
          newRanges.push(...newBookedRanges);
          setBookedRanges(newRanges);
        }
      });
    }
    
  }, [villa]);


    return (
        <div className={styles.dateRangePicker}>
            <div placeholder="Arrival & Departure dates" className={styles.datesSelected}>
            {rangeDates && rangeDates.length==2 ? (new Date(rangeDates[0]).toLocaleDateString()) + " - " + (new Date(rangeDates[1]).toLocaleDateString()) : "Arrival & Departure dates"}
            </div>
            <DatePicker
                ref={datePickerRef} 
                id="date-picker"
                required
                format="DD.MM.YYYY"
                multiple
                currentDate={rangeDates?rangeDates[0]:new Date()}
                onChange={(ranges) => {
                    
                    const bookingRangeIndex = bookedRanges.length
                  
                    if(ranges.length<= bookingRangeIndex)
                      return false
                    
                    if(ranges.length>(bookingRangeIndex+1)){
                      if(bookingRangeIndex==0)
                        ranges.splice(0,1)
                      else
                        ranges.splice(bookingRangeIndex,1)
                      // return false
                    }
                 
                    const startDate= (new Date(ranges[bookingRangeIndex][0]).setHours(0,0,0,0))
                    const endDate= (new Date(ranges[bookingRangeIndex][bookingRangeIndex]).setHours(0,0,0,0))
                    
                 
                    if (isReserved(startDate)) 
                      return false;
                    
                    
                   
                    if ( isReserved(endDate)) 
                      return false;

                   
                    
                    if(ranges.length<=(bookingRangeIndex+1))
                      setRangeDates(ranges[bookingRangeIndex]) //update prop
                  
                  }}
                //style the reserved dates red
                mapDays={({date}) => {
                    let className;
                    const strDate = (new Date(date).setHours(0,0,0,0))//date.format();
                    if (isReserved(strDate)) className = "reserved";
                    if (className) return { className };
                  }}

                range
                weekStartDayIndex={1}
                value={bookedRanges} //only first time
                editable = {false}
                rangeHover
                minDate={new Date()}
                showOtherDays
                monthYearSeparator="|"
                // dateSeparator=" to "
                // className={width<600?"rmdp-mobile":"rmdp-desktop"}
                // placeholder="Arrival & Departure dates"
            />

            <div className={styles.button} onClick={() => datePickerRef.current.isOpen?datePickerRef.current.closeCalendar():datePickerRef.current.openCalendar()}>
                <BsFillCalendarWeekFill className={styles.icon} />
            </div>
        </div>
    )
}

export default DateRangePicker