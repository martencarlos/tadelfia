"use client"
import styles from "./facilities.module.css"
import {BiSolidParking} from "react-icons/bi"
import {FaWifi} from "react-icons/fa"
import {MdOutlineKitchen} from "react-icons/md"
import {BsHouseDoor,BsXLg} from "react-icons/bs"
import {CgMoreO} from "react-icons/cg"
import {FcCheckmark} from "react-icons/fc"


function Facilities() {

  function openModal() {
    const modal = document.getElementById("facilitesModal")
    if ((modal.style.display === "none" || modal.style.display === "") ) {
        modal.style.display = "flex"
    }
  }
  function closeModal() {
    const modal = document.getElementById("facilitesModal")
    if ((modal.style.display === "flex" ) ) {
        modal.style.display = "none"
    }
  }

  return (
    <div className={styles.facilities}>
    <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <BsHouseDoor className={styles.icon} />
          </div>
          Entire apartment
      </div>
      <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <BiSolidParking className={styles.icon} />
          </div>
          Parking
      </div>
      <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FaWifi className={styles.icon} />
          </div>
          Wifi
      </div>
      <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <MdOutlineKitchen className={styles.icon} />
          </div>
          Kitchen
      </div>
      <div onClick={openModal} className={styles.facilityMore}>
          <div className={styles.iconWrapper}>
            <CgMoreO className={styles.icon} />
          </div>
          More
      </div>
      <div id="facilitesModal" className={styles.facilitiesModal}>
        <h1 className={styles.h1}>{"Facilities"}</h1>

        <div className={styles.facilitiesContainer}>
        <div className={styles.facilitiesColumn}>
        <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Free parking
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Entire apartment
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Terrace
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Wifi
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Washing machine
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Iron
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          TV
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Heating
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Hot water
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Bed linens
          </div>
     
          </div>
          <div className={styles.facilitiesColumn}>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Hair dryer
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Shampoo
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Hangers
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Fire extinguisher
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Smoke alarm
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          First aid kit
          </div>
          <div className={styles.facility}>
          <div className={styles.iconWrapper}>
            <FcCheckmark className={styles.icon} />
          </div>
          Coffee maker
          </div>
       
          </div>
        </div>
        <div className={styles.closeButton} onClick={closeModal}>
                    <BsXLg />
                </div>
      </div>

    </div>
  )
}

export default Facilities