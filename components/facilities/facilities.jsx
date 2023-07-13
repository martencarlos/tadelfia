"use client";
import styles from "./facilities.module.css";
import { BiSolidParking } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { FaPeopleGroup, FaWheelchairMove } from "react-icons/fa6";
import { MdOutlineKitchen, MdPool } from "react-icons/md";
import { BsHouseDoor, BsXLg } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { FcCheckmark } from "react-icons/fc";
import { IoBedSharp } from "react-icons/io5";

function Facilities({ facilities }) {
  function openModal() {
    const modal = document.getElementById("facilitesModal");
    if (modal.style.display === "none" || modal.style.display === "") {
      modal.style.display = "flex";
    }
  }
  function closeModal() {
    const modal = document.getElementById("facilitesModal");
    if (modal.style.display === "flex") {
      modal.style.display = "none";
    }
  }

  return (
    <div className={styles.facilities}>
      {facilities && (
        <div className={styles.villaSpecificFacilities}>
          <div className={styles.facility}>
            <div className={styles.iconWrapper}>
              <IoBedSharp className={styles.icon} />
            </div>
            {facilities.bedrooms} bedrooms
          </div>
          <div className={styles.facility}>
            <div className={styles.iconWrapper}>
              <FaPeopleGroup className={styles.icon} />
            </div>
            {facilities.guestCapacity} guests
          </div>
          <div className={styles.facility}>
            <div className={styles.iconWrapper}>
              <MdPool className={styles.icon} />
            </div>
            {facilities.pool} pool
          </div>
          <div className={styles.facility}>
            <div className={styles.iconWrapper}>
              <FaWheelchairMove className={styles.icon} />
            </div>
            {facilities.wheelchairAccessible}
          </div>
        </div>
      )}
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
      <div id="facilitesModal" className={styles.modalBackground}>
      <div  className={styles.facilitiesModal}>
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
              Air conditioning
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
              Security box
            </div>
            <div className={styles.facility}>
              <div className={styles.iconWrapper}>
                <FcCheckmark className={styles.icon} />
              </div>
              Shower
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

    </div>
  );
}

export default Facilities;
