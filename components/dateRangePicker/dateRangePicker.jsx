
"use client"
import { useEffect, useRef, useState } from "react"
import DatePicker, { DateObject } from "react-multi-date-picker"
import "./component.css"
import styles from "./dateRangePicker.module.css"
// import "react-multi-date-picker/styles/layouts/mobile.css"
import { BsFillCalendarWeekFill } from "react-icons/bs";
// import { useWindowSize } from "@/hooks/windowSize"
import { getYearBookingsFromVilla } from "@/lib/booking";


function DateRangePicker({rangeDates, setRangeDates,villa}) {
    const datePickerRef = useRef()
    // const { width } = useWindowSize()
    const [bookedRanges, setBookedRanges] = useState([]); // Booked ranges
    const [values, setValues] = useState([]);
  // const [loading, setLoading] = useState(true);
  

  function isReserved(strDate) {
    return bookedRanges.some(([start, end]) => strDate >= (new Date(start)) && strDate <= (new Date(end)));
  }

  useEffect(() => {
    getYearBookingsFromVilla(new Date().getFullYear(), villa).then((data) => {
      const newRanges = [];
      if (data.length > 0) {
        const newBookedRanges = data.map((booking) => {
          return [booking.accomodation.checkin,booking.accomodation.checkout]
        // {
        //     startDate: new Date(booking.accomodation.checkin),
        //     endDate: new Date(booking.accomodation.checkout),
        //     color: "#d11a2a",
        //     key: booking._id,
        //   };
        });
        newRanges.push(...newBookedRanges);
        setBookedRanges(newRanges);
        setValues(newRanges);
      }
    });
  }, [villa]);

    return (
        <div className={styles.dateRangePicker}>
            <div placeholder="Arrival & Departure dates" className={styles.datesSelected}>
            {rangeDates && rangeDates.length==2 ? (new Date(rangeDates[0]).toLocaleDateString()) + " - " + (new Date(rangeDates[1]).toLocaleDateString()) : "Arrival & Departure dates"}
            </div>
            <DatePicker
                ref={datePickerRef} 
                format="DD.MM.YYYY"
                multiple
                currentDate={new Date()}
                // value={new Date()}
                placeholder="Arrival & Departure dates"
                // dateSeparator=" to "
                // className={width<600?"rmdp-mobile":"rmdp-desktop"}
                onChange={(ranges) => {
                    console.log(ranges)
                    console.log(bookedRanges.length)
                    const bookingRangeIndex = bookedRanges.length
                    if(ranges.length== bookingRangeIndex)
                      return false
                    
                    if(ranges.length>(bookingRangeIndex+1)){
                      if(bookingRangeIndex==0)
                        ranges.splice(0,1)
                      else
                        ranges.splice(bookingRangeIndex,1)
                      // return false
                    }
                      

                    const startDate= (new Date(ranges[bookingRangeIndex][0]))
                    const endDate= (new Date(ranges[bookingRangeIndex][bookingRangeIndex]))

                    // setValues(ranges) //update use state
                    if (isReserved(startDate) || isReserved(endDate)) 
                      return false;

                      if(ranges.length<=(bookingRangeIndex+1))
                      setRangeDates(ranges[bookingRangeIndex]) //update prop
                
                  }}
                required
                //style the reserved dates red
                mapDays={({ date}) => {
                    let className;
                    const strDate = new Date(date)//date.format();
                    if (isReserved(strDate)) className = "reserved";
                    if (className) return { className };
                  }}
                range
                value={values}
                
                editable = {false}
                rangeHover
                minDate={new Date()}
                showOtherDays
                monthYearSeparator="|"
            />

            <div className={styles.button} onClick={() => datePickerRef.current.isOpen?datePickerRef.current.closeCalendar():datePickerRef.current.openCalendar()}>
                <BsFillCalendarWeekFill className={styles.icon} />
            </div>
        </div>
    )
}

export default DateRangePicker