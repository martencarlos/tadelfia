import styles from "./page.module.css";
import data from "./data.json";
import Image from "next/image";

import Availability from "@/components/availability/availability";
import Booking from "@/components/booking/booking";
import Carousel from "@/components/carousel/carousel";



function Villa({ params }) {
  console.log(params.id);
  const villaJsonInfo = data.filter((item)=> item.villa === params.id)[0]
  console.log(villaJsonInfo)

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
