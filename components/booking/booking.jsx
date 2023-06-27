"use client";

import styles from "./booking.module.css";
import DateRangePicker from "@/components/dateRangePicker/dateRangePicker";
import TextField from "@mui/material/TextField";
import TextareaAutosize from '@mui/base/TextareaAutosize';

import Select from '@mui/material/Select';
import SelectSmall from "../mui/selectSmall/selectSmall";
import "./booking.css"

import { useState } from "react";
import PaymentProvider from "../paymentProvider/paymentProvider";



function Booking() {

  const [trigger, setTrigger] = useState(null);

  const handleSubmit = async(e) => {
      e.preventDefault();
      console.log("submitted");
      
      setTrigger(true);
  }
 
  return (
    <div className={styles.booking}>
      <h1 className={styles.h1}>Booking</h1>
      <form onSubmit={handleSubmit} className={styles.bookingForm}>
        <h3 className={styles.h2}>Contact</h3>
        <div className={styles.section}>
          <TextField label="First Name" id="firstName" required size="small" />
          <TextField label="Last Name" id="lastName" required size="small" />
          <TextField
            label="Email"
            type="email"
            id="email"
            required
            size="small"
          />
          <TextField
            label="Phone"
            type="tel"
            id="phone"
            required
            size="small"
          />
        
        <h5 className={styles.h2}>Address</h5>
        <div className={styles.subSection}>
          <TextField label="Street / Number" id="street" type="text" required size="small" />
          <TextField label="Postal Code" id="postal" type="number" required size="small" />
          <TextField
            label="Town / City"
            type="text"
            id="towncity"
            required
            size="small"
          />
          <TextField
            label="Country"
            type="text"
            id="country"
            required
            size="small"
          />
        </div>
        </div>
        <h3 className={styles.h2}>Accommodation</h3>
        <div className={styles.section}>
          <DateRangePicker />
          <SelectSmall />
          <TextareaAutosize 
            style={{fontSize:"16px", padding:"8.5px 14px", width: "100%"}} 
            minRows={3}
            className={styles.textarea}
            placeholder="Message for the host"
          />
        </div>

        <h3 className={styles.h2}>Payment</h3>
        <div className={styles.paymentSection}>
        <PaymentProvider 
          trigger={trigger}
        />
        
        </div>
        <input className={styles.button} type="submit" value=" Book Now !" />
        
      </form>
    </div>
  );
}

export default Booking;
