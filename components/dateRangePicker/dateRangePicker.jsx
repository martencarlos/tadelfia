
"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./dateRangePicker.module.css"
import "./component.css"

import DatePicker from "react-multi-date-picker"
import DateObject from "react-date-object"
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { getAllBookingRanges } from "@/lib/booking";
import "react-multi-date-picker/styles/layouts/mobile.css"

import { useWindowSize } from "@/hooks/windowSize"


function DateRangePicker({rangeDates, setRangeDates,villa}) {
    const datePickerRef = useRef()
    const firstRanges = useRef()
 
    const { width } = useWindowSize()
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

  function isReservedPlusMinusOneDay(strDate) {
    let returnValue = false;
    
    if(bookedRanges.length>0){
      for (let i = 0; i < bookedRanges.length; i++) {
        var checkinDate = new Date();
        var previousDay= new Date();
        var checkoutDate = new Date();
        var nextDay= new Date();
        // console.log("select date "+strDate.setHours(0,0,0,0))
        // console.log("start date "+new Date(bookedRanges[i][0]).setHours(0,0,0,0))
        // console.log("end date "+new Date(bookedRanges[i][1]).setHours(0,0,0,0))
        checkinDate = new Date(bookedRanges[i][0]);
        previousDay = new Date(checkinDate.setDate(checkinDate.getDate()-1));
        checkoutDate = new Date(bookedRanges[i][1]);
        nextDay = new Date(checkoutDate.setDate(checkoutDate.getDate()+1));
        if(strDate >= previousDay.setHours(0,0,0,0) && strDate<= nextDay.setHours(0,0,0,0)){
          return true;
        }
      };
    }
    return returnValue
  }

  function isMiddle(strDate) {
    let returnValue = false;
    
    if(bookedRanges.length>0){
      for (let i = 0; i < bookedRanges.length; i++) {
        var checkinDate = new Date();
        var previousDay= new Date();
        var checkoutDate = new Date();
        var nextDay= new Date();
        // console.log("select date "+strDate.setHours(0,0,0,0))
        // console.log("start date "+new Date(bookedRanges[i][0]).setHours(0,0,0,0))
        // console.log("end date "+new Date(bookedRanges[i][1]).setHours(0,0,0,0))
        checkinDate = new Date(bookedRanges[i][0]);
        previousDay = new Date(checkinDate.setDate(checkinDate.getDate()-1));
        checkoutDate = new Date(bookedRanges[i][1]);
        nextDay = new Date(checkoutDate.setDate(checkoutDate.getDate()+1));
        if(strDate > previousDay.setHours(0,0,0,0) && strDate< nextDay.setHours(0,0,0,0)){
          return true;
        }
      };
    }
    return returnValue
  }

  function isCheckoutDate(strDate) {
    let returnValue = false;
    
    if(bookedRanges.length>0){
      for (let i = 0; i < bookedRanges.length; i++) {
        if(strDate=== (new Date(bookedRanges[i][1]).setHours(0,0,0,0))){
          return true;
        }
      };
    }
    return returnValue
  }

  function isNextDayAfterCheckoutDate(strDate) {
    let returnValue = false;
    var checkoutDate = new Date();
    var nextDay;
    
    if(bookedRanges.length>0){
      for (let i = 0; i < bookedRanges.length; i++) {
        checkoutDate = new Date(bookedRanges[i][1]);
        nextDay = new Date(checkoutDate.setDate(checkoutDate.getDate()+1));
        if(strDate=== (nextDay.setHours(0,0,0,0))){
          return true;
        }
      };
    }
    return returnValue
  }

  function isCheckinDate(strDate) {
    let returnValue = false;
    
    if(bookedRanges.length>0){
      for (let i = 0; i < bookedRanges.length; i++) {
        if(strDate === (new Date(bookedRanges[i][0]).setHours(0,0,0,0))){
          return true;
        }
      };
    }
    return returnValue
  }

  function isPreviousDayBeforeCheckinDate(strDate) {
    let returnValue = false;
    var checkinDate = new Date();
    var previousDay;
    
    if(bookedRanges.length>0){
      for (let i = 0; i < bookedRanges.length; i++) {
        checkinDate = new Date(bookedRanges[i][0]);
        previousDay = new Date(checkinDate.setDate(checkinDate.getDate()-1));
        if(strDate=== (previousDay.setHours(0,0,0,0))){
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
          var bookedRangesTMP = [...bookedRanges]
          bookedRangesTMP.push(...newBookedRanges.filter((range) => range !== undefined))
          
          // Iterate through the array and subtract one day from each end date
          bookedRangesTMP.forEach(rangei => {
            // Add one day to the start date
            rangei[0].setDate(rangei[0].getDate() + 1);
            // Subtract one day from the end date
            rangei[1].setDate(rangei[1].getDate() - 1);
          });

          setBookedRanges(bookedRangesTMP);
          // setBookedRanges(...bookedRanges, newBookedRanges.filter((range) => range !== undefined));
        }
      });
    }else{
      getAllBookingRanges().then((data) => {
        if (data.length > 0) {
          const newBookedRanges = data.map((booking) => {
            return [new Date(booking.accomodation.checkin),new Date(booking.accomodation.checkout)]
          });
          newRanges.push(...newBookedRanges);
          
          //Iterate through the array and subtract one day from each end date
          newRanges.forEach(range => {
            // Subtract one day from the end date
            range[0].setDate(range[0].getDate() + 1);
            range[1].setDate(range[1].getDate() - 1);
          });
          // console.log(newRanges)

          setBookedRanges(newRanges);
        }
      });
    }
    
  }, [villa]);

  useEffect(() => {
    console.log(rangeDates)
  }
  , [rangeDates]);

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
                currentDate={rangeDates !== null ? rangeDates[0] : new DateObject()}
               
                onChange={(ranges) => {
                    const bookingRangeIndex = bookedRanges.length
                    // console.log(ranges)
                    // console.log(bookedRanges)

                    // if the user selects a date range that is already booked do nothing
                    if(ranges.length<= bookingRangeIndex)
                      return false
                    
                    // if user select a date after having selected a date range
                    if(ranges.length>(bookingRangeIndex+1)){
                      //in case of first booking ever
                      if(bookingRangeIndex==0)
                        ranges.splice(0,1)
                      else
                        ranges.splice(bookingRangeIndex,1)
                        //removes the last one
                    }

                    const startDate= (new Date(ranges[bookingRangeIndex][0]).setHours(0,0,0,0))
                    const endDate= (new Date(ranges[bookingRangeIndex][1]).setHours(0,0,0,0))
                    if (isReserved(startDate)) 
                      return false;
                    if (isReserved(endDate)) 
                      return false;

                    // if (isReserved(startDate) && isCheckoutDate(startDate)) 
                    //   return false;
                    // if (isReserved(endDate) && isCheckinDate(endDate)) 
                    //   return false;

                    //update prop. Does nothing to calendar
                    if(ranges.length<=(bookingRangeIndex+1))
                      setRangeDates(ranges[bookingRangeIndex]) 
                  }}
                //style the reserved dates red
                mapDays={({date}) => {
                    let className;
                    const strDate = (new Date(date).setHours(0,0,0,0))//date.format();
                    if(isMiddle(strDate)) className = className+" middle";
                    if (isReservedPlusMinusOneDay(strDate)) className = className+" reserved";
                    if (isNextDayAfterCheckoutDate(strDate)) className = className + " checkout";
                    if (isPreviousDayBeforeCheckinDate(strDate)) className = className + " checkin";
                    if (isReservedPlusMinusOneDay(strDate) && isCheckoutDate(strDate)) className = " reserved checkout";
                    if (isReservedPlusMinusOneDay(strDate) && isCheckinDate(strDate)) className = className+ " reserved checkin";
                    if (isCheckoutDate(strDate) && isCheckinDate(strDate)) className = className+ " checkout checkin";
                    if (isReservedPlusMinusOneDay(strDate) && isNextDayAfterCheckoutDate(strDate) && isPreviousDayBeforeCheckinDate(strDate)) className = className +  " reserved checkout checkin";
                    if (className) return { className };
                  }}
                onPropsChange={(info) => {
                    //Only relevant in mobile view
                    if (!firstRanges.current)
                      firstRanges.current = info.value

                    let ranges = info.value
                    console.log(firstRanges.current)
                    const bookingRangeIndex = bookedRanges.length

                    // if the user selects a date range that is already booked do nothing
                    if(ranges.length<= bookingRangeIndex){
                      ranges.push(...firstRanges.current)
                    }
                    
                    // if user select a date after having selected a date range
                    if(ranges.length>(bookingRangeIndex+1)){
                      //in case of first booking ever
                      if(bookingRangeIndex==0)
                        ranges.splice(0,1)
                      else
                        ranges.splice(bookingRangeIndex,1)
                        //removes the last one
                    }

                    // const startDate= (new Date(ranges[bookingRangeIndex][0]).setHours(0,0,0,0))
                    // const endDate= (new Date(ranges[bookingRangeIndex][1]).setHours(0,0,0,0))
                    // if (isReserved(startDate)) {
                    //   ranges= bookedRanges
                    // }
                  
                    // if (isReserved(endDate)){
                    //   ranges = bookedRanges
                    // }
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
                className={width<600?"rmdp-mobile":"rmdp-desktop"}
                // placeholder="Arrival & Departure dates"
            />

            <div className={styles.button} onClick={() => datePickerRef.current.isOpen?datePickerRef.current.closeCalendar():datePickerRef.current.openCalendar()}>
                <BsFillCalendarWeekFill className={styles.icon} />
            </div>
        </div>
    )
}

export default DateRangePicker