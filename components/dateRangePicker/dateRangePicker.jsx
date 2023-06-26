
"use client"
import { useRef } from "react"
import DatePicker from "react-multi-date-picker"
import "./component.css"
import styles from "./dateRangePicker.module.css"
import { BsFillCalendarWeekFill } from "react-icons/bs";


function DateRangePicker() {
    const datePickerRef = useRef()

    return (
        <div className={styles.dateRangePicker}>
            <DatePicker
                ref={datePickerRef} 
                format="DD.MM.YYYY"
                // value={new Date()}
                placeholder="Arrival & Departure dates"
                // dateSeparator=" to "
                range
                editable = {false}
                rangeHover
                minDate={new Date()}
                showOtherDays
                monthYearSeparator="|"
            />
            <div className={styles.button} onClick={() => datePickerRef.current.openCalendar()}>
                <BsFillCalendarWeekFill className={styles.icon} />
            </div>
        </div>
    )
}

export default DateRangePicker