"use client"

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useWindowSize } from "@/hooks/windowSize";

import styles from "./availability.module.css";
import "./component.css"

// Booked ranges
const ranges = [
    {
      startDate: new Date(2023,7,1),
      endDate: new Date(2023,7,31),
      color: "#d11a2a",
      key: "range1",
    },
    {
      startDate: new Date(2023,6,6),
      endDate: new Date(2023,6,9),
      color: "#d11a2a",
      key: "range1",
    },
  ];

function Availability() {
  const size = useWindowSize();

  return (
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
        months={size.width<800?1:2}
        direction="horizontal"
        ranges={ranges}
        weekStartsOn={1}
        minDate={new Date()}
      />
    </div>
  )
}

export default Availability