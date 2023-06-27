
"use client"
import { useEffect, useRef, useState } from "react"
import DatePicker, { DateObject } from "react-multi-date-picker"
import "./component.css"
import styles from "./dateRangePicker.module.css"
import "react-multi-date-picker/styles/layouts/mobile.css"
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { useWindowSize } from "@/hooks/windowSize"

function DateRangePicker({setRangeDates}) {
    const datePickerRef = useRef()
    const { width } = useWindowSize()

    return (
        <div className={styles.dateRangePicker}>
            <DatePicker
                ref={datePickerRef} 
                format="DD.MM.YYYY"
                // value={new Date()}
                placeholder="Arrival & Departure dates"
                // dateSeparator=" to "
                className={width<600?"rmdp-mobile":"rmdp-desktop"}
                onChange={setRangeDates}
                required
                range
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