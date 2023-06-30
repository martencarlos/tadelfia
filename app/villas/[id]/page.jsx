import styles from "./page.module.css";
import data from "./data.json";
import Image from "next/image";

import Availability from "@/components/availability/availability";
import Booking from "@/components/booking/booking";
import Carousel from "@/components/carousel/carousel";
import { get } from "mongoose";

async function filter(arr, callback) {
  const fail = Symbol()
  return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
}

  function Villa({ params }) {
    // //sync filter function
    // function filterData(item) {
    //   for (let i = 0; i < item.length; i++) {
    //     if (item[i].villa === params.id) {
    //       return item[i]
    //     }
    //   }
    // }
    // const villaJsonInfo = filterData(data)

    const villaJsonInfo = data.filter((item) => item.villa === params.id)[0]
  
  return (
    <div className={styles.villa}>

      {/* Landing section */}
      <div className={styles.villaLandingSection}>
        
        {/* Text Section */}
        <div className={styles.textContainer}>
          <h1 className={styles.h1}>{villaJsonInfo.title }</h1>
          <p className={styles.p}>{villaJsonInfo.p1}</p>
          <p className={styles.p}>{villaJsonInfo.p2}</p>
          <p className={styles.p}>{villaJsonInfo.p3}</p>
          {villaJsonInfo.p4 && (
            <p className={styles.p}>{villaJsonInfo.p4}</p>
          )}
        </div>
         <Carousel />
      </div>

      {/* Availability image */}
      <div className={styles.imgContainer}>
        {/* Availability Section */}
        <div className={styles.availability}>
          <Availability villa={params.id} />
        </div>
        <Image
          src={"/maingallery/" + villaJsonInfo.img + ".webp"}
          className={styles.img}
          width={1000}
          height={700}
          priority
          placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
          alt={params.id}
        />
      </div>

      {/* Booking Section */}
      <div className={styles.booking}>
        <Booking villa={params.id} />
      </div>
    </div>
  );
}

export default Villa;
