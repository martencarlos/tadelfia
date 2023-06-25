"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import data from "./data.json";
import Image from "next/image";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

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

function Villa({ params }) {
 
  console.log(params.id);
  return (
    <div className={styles.villa}>
      <div className={styles.textContainer}>
        <h1 className={styles.h1}>{data[params.id].title}</h1>
        <p className={styles.p}>{data[params.id].p1}</p>
        <p className={styles.p}>{data[params.id].p2}</p>
        <p className={styles.p}>{data[params.id].p3}</p>
        {data[params.id].p4 && <p className={styles.p}>{data[params.id].p4}</p>}
      </div>

      <div className={styles.imgContainer}>
        <Image
          src={"/maingallery/" + data[params.id].img + ".webp"}
          className={styles.img}
          width={1600}
          height={1400}
          alt={params.id}
        />
      </div>

      <div className={styles.availability}>
        <h1 className={styles.h1}>Availability</h1>
        <DateRange
          onChange={(item) => {}}
          moveRangeOnFirstSelection={false}
          shownDate={new Date()}
          
          editableDateInputs={false}
          showPreview={false}
          showDateDisplay={false}
          dragSelectionEnabled={false}
          months={2}
          direction="horizontal"
          ranges={ranges}
          weekStartsOn={1}
          minDate={new Date()}
        />
      </div>

      <div className={styles.booking}>
        Booking
      </div>
    </div>
  );
}

export default Villa;
