
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import data from "./[id]/data.json";

import SmallAvailability from '@/components/smallAvailability/smallAvailability';
import Facilities from '@/components/facilities/facilities';

// Static metadata
export const metadata = {
    title: "Villas", description: "Overview of apartments" 
  }

function Villas() {

  return (
    <div className={styles.villasFullPage}>
        <div className={styles.villasHeader}>
            <h1 className={styles.villasHeaderTitle}> {" - T'Adelfia Apartments - "} </h1>
        </div>
        <div className={styles.apartmentList}>
        {data.map((item, index) => (
            <div key={index} className={styles.apartment}>
                <div className={styles.apartmentImage}>
                    <Image src={"/apartments/"+item.villa+"/2.jpg"}
                        alt="apartment" 
                        fill
                        priority
                        className={styles.img}
                    />
                </div>
                <SmallAvailability villa={item.villa} />
                <div className={styles.apartmentInfo}>
                    <div className={styles.titleSection}>
                    <div className={styles.title}>
                        <h2 className={styles.h2}>{item.villa === "Villa"? item.villa + " - Book the whole property" : item.villa + " apartment"}</h2>
                    </div>
                    <div className={styles.subTitle}>
                        <p>{item.subTitle}</p>
                    </div>
                    </div>
                    
                    <Facilities facilities= {item}/>
                   
                    
                </div>
                <div className={styles.apartmentButtonSection}>
                    <div className={styles.priceWrapper}> 
                        <p className={styles.priceLabel}>1 night</p>
                        <h4> {"€ "+item.pricePerNight}</h4>
                    </div>
                    <Link className={styles.button} href={"/villas/"+item.villa+"#top"} > Book now </Link>
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Villas