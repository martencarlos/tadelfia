

import styles from "./page.module.css";
import data from "./data.json";
import Image from "next/image";

import StaticCalendar from "@/components/staticCalendar/staticCalendar";
import Booking from "@/components/booking/booking";


function Villa({ params }) {
  
  console.log(params.id);
  return (
    <div className={styles.villa}>
      
      {/* Text Section */}
      <div className={styles.textContainer}>
        <h1 className={styles.h1}>{data[params.id].title}</h1>
        <p className={styles.p}>{data[params.id].p1}</p>
        <p className={styles.p}>{data[params.id].p2}</p>
        <p className={styles.p}>{data[params.id].p3}</p>
        {data[params.id].p4 && <p className={styles.p}>{data[params.id].p4}</p>}
      </div>
      
      {/* Image Section */}
      <div className={styles.imgContainer}>
       {/* Availability Section */}
       <div className={styles.availability}>
       <StaticCalendar />
     </div>
        <Image
          src={"/maingallery/" + data[params.id].img + ".webp"}
          className={styles.img}
          width={1600}
          height={1400}
          alt={params.id}
        />
       
      </div>

      
      

      {/* Booking Section */}
      <div className={styles.booking}>
        <Booking />
      </div>
    </div>
  );
}

export default Villa;
