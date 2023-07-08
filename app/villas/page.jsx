
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import data from "./[id]/data.json";

import SmallAvailability from '@/components/smallAvailability/smallAvailability';

function Villas() {

  return (
    <div className={styles.villasFullPage}>
        <div className={styles.apartmentList}>
        {data.map((item, index) => (
            <div key={index} className={styles.apartment}>
                <div className={styles.apartmentImage}>
                    <Image src={"/maingallery/"+item.img+".webp" }
                        alt="apartment" 
                        fill
                        priority
                        placeholder={process.env.NEXT_PUBLIC_HOST !== "http://localhost:3000" ? "blur" : undefined}
                        className={styles.img}
                    />
                </div>
                <SmallAvailability villa={item.villa} />
                <div className={styles.apartmentInfo}>
                    <div className={styles.titleSection}>
                    <div className={styles.title}>
                        <h3>{item.villa === "Villa"? item.villa + " - Book the whole property" : item.villa + " apartment"}</h3>
                    </div>
                    <div className={styles.subTitle}>
                        <p>{item.subTitle}</p>
                    </div>
                    </div>
                    <div className={styles.amenities}>
                        <div className={styles.amenity}>
                            <div className={styles.amenityTitle}>
                                <h4>Bedrooms</h4>
                            </div>
                            <div className={styles.amenityContent}>
                                <p>{item.bedrooms}</p>
                            </div>
                        </div>
                        <div className={styles.amenity}>
                            <div className={styles.amenityTitle}>
                                <h4>Guests</h4>
                            </div>
                            <div className={styles.amenityContent}>
                                <p>{item.guestCapacity}</p>
                            </div>
                        </div>
                        <div className={styles.amenity}>
                            <div className={styles.amenityTitle}>
                                <h4>Pool</h4>
                            </div>
                            <div className={styles.amenityContent}>
                                <p>{item.pool}</p>
                            </div>
                        </div>
                        <div className={styles.amenity}>
                            <div className={styles.amenityTitle}>
                                <h4>Wheelchair Acc.</h4>
                            </div>
                            <div className={styles.amenityContent}>
                                <p>{item.wheelchairAccessible}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.apartmentButtonSection}>
                    <div className={styles.priceWrapper}> 
                        <p className={styles.priceLabel}>1 night</p>
                        <h4> {"€ "+item.pricePerNight}</h4>
                    </div>
                    <Link className={styles.button} href={"/villas/"+item.villa} > Book now </Link>
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Villas