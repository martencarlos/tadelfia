import styles from "./page.module.css";
import data from "./data.json";
import Image from "next/image";

import Availability from "@/components/availability/availability";
import Booking from "@/components/booking/booking";
import Carousel from "@/components/carousel/carousel";

function Villa({ params }) {
  // console.log(params.id);

  return (
    <div className={styles.villa}>

      {/* Landing section */}
      <div className={styles.villaLandingSection}>
        
        {/* Text Section */}
        <div className={styles.textContainer}>
          <h1 className={styles.h1}>{data[params.id].title}</h1>
          <p className={styles.p}>{data[params.id].p1}</p>
          <p className={styles.p}>{data[params.id].p2}</p>
          <p className={styles.p}>{data[params.id].p3}</p>
          {data[params.id].p4 && (
            <p className={styles.p}>{data[params.id].p4}</p>
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
          src={"/maingallery/" + data[params.id].img + ".webp"}
          className={styles.img}
          width={1000}
          height={700}
          priority
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
