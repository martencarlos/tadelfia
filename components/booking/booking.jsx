"use client";

import styles from "./booking.module.css";
import DateRangePicker from "@/components/dateRangePicker/dateRangePicker";
import TextField from "@mui/material/TextField";
// import TextareaAutosize from "@mui/base/TextareaAutosize";
import dataJson from "@/app/villas/[id]/data.json";
import "./booking.css";

import { useEffect, useState } from "react";
import PaymentProvider from "../paymentProvider/paymentProvider";
import GuestPicker from "../guestPicker/guestPicker";
import CircularProgress from '@mui/material/CircularProgress';


function Booking({ villa }) {
  const [trigger, setTrigger] = useState(0);
  const [rangeDates, setRangeDates] = useState(null);
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(null);
  const [price, setPrice] = useState(null);
  const [booking, setBooking] = useState(null);
  const [processing, setProcessing] = useState(false);

  // if picked checkin and checkout dates change, update the nights and pricing
  useEffect(() => {
    if (rangeDates) {
      
      //remove red border from arrivalAndDepartureDates if there was an error
      const arrivalAndDepartureDates = document.getElementById("arrivalAndDepartureDates");
      if (arrivalAndDepartureDates.style.border === "1px solid red")
        arrivalAndDepartureDates.style.border = "none";


      const nightsCalc = Math.ceil(
        (rangeDates[1] - rangeDates[0]) / (1000 * 3600 * 24)
      );
      if (nightsCalc !== nights && nightsCalc > 0) {
        setNights(nightsCalc);
        setPrice(
          dataJson.find((item) => item.villa === villa).pricePerNight * nightsCalc
        );
      }
    }
  }, [rangeDates, villa]);

  // submit form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true)
    //check rangeDates
    if (!rangeDates) {
      const arrivalAndDepartureDates = document.getElementById("arrivalAndDepartureDates");

      arrivalAndDepartureDates.style.border = "1px solid red";
      arrivalAndDepartureDates.scrollIntoView();

      // alert("Please select arrival and departure dates");
      setProcessing(false)
      return;
    }

    const form = document.getElementById("booking");
    const newBooking = {
      contact: {
        firstName: form.elements["firstName"].value,
        lastName: form.elements["lastName"].value,
        email: form.elements["email"].value,
        phone: form.elements["phone"].value,
      },
      address: {
        street: form.elements["street"].value,
        postal: form.elements["postal"].value,
        towncity: form.elements["towncity"].value,
        country: form.elements["country"].value,
      },
      accomodation: {
        villa: villa,
        messageToHost: form.elements["messageToHost"].value,
        checkin: new Date(rangeDates[0]),  //rangeDates[0].format("DD.MM.YYYY"),
        checkout: new Date(rangeDates[1]),
        nights: nights,
        price: price ? price : 0,
        guests: guests,
      },
    };
  
    //check if booking has changed, if update payment intent in paymentProvider children with new price and booking info
    if (JSON.stringify(booking) !== JSON.stringify(newBooking)) {
      setBooking(newBooking);
    }

    //payment trigger
    setTrigger((prev_trigger) => prev_trigger + 1);
  };
 
  return (
    <div className={styles.booking}>
      <h1 className={styles.h1}>Booking</h1>
      <form id="booking" onSubmit={handleSubmit} className={styles.bookingForm}>

        {/* Accommodation Section */}
        <h3 className={styles.h2}>Accommodation</h3>
        <div className={styles.section}>

          {/*Arrival and departure dates*/}
          <div className={styles.arrivalAndDepartureDates} id="arrivalAndDepartureDates" >
            <DateRangePicker rangeDates={rangeDates} villa = {villa} setRangeDates={setRangeDates} />
          </div>
          {/*Guests*/}
          <GuestPicker setGuests={setGuests} />

          {/*Comment to host*/}
          <textarea
            style={{ minHeight:"100px", fontSize: "16px", padding: "8.5px 14px", width: "100%" }}
            // minRows={3}
            id="messageToHost"
            className={styles.textarea}
            placeholder="Message for the host"
          />
        </div>

        {/* Contact Section */}
        <h3 className={styles.h2}>Contact</h3>
        <div className={styles.section}>
         <div className={styles.row}>
          {/* firstname*/}
          <TextField className={styles.input} label="First Name" id="firstName" required size="small" />
          {/* lastname*/}
          <TextField className={styles.input} label="Last Name" id="lastName" required size="small" />
          </div>
          <div className={styles.row}>
          {/* email*/}
          <TextField
          className={styles.input}
            label="Email"
            type="email"
            id="email"
            required
            size="small"
          />
          {/* phone*/}
          <TextField
          className={styles.input}
            label="Phone"
            type="tel"
            id="phone"
            pattern="/^\+(?:[0-9] ?){6,14}[0-9]$/"
            required
            size="small"
          />
          </div>

          {/* Address Section */}
          <h5 className={styles.h2}>Address</h5>
          <div className={styles.subSection}>
          <div className={styles.row}>
            <TextField
            className={styles.input}
              label="Street / Number"
              id="street"
              type="text"
              required
              size="small"
            />
            <TextField
            className={styles.input}
              label="Postal Code"
              id="postal"
              type="number"
              required
              size="small"
            />
            </div>
          <div className={styles.row}>
            
            <TextField
            className={styles.input}
              label="Town / City"
              type="text"
              id="towncity"
              required
              size="small"
            />
            <TextField
            className={styles.input}
              label="Country"
              type="text"
              id="country"
              required
              size="small"
            />
            </div>

          </div>
        </div>

        {/* Payment Section */}
        <h3 className={styles.h2}>Payment</h3>
        
        
        <div className={styles.paymentSection}>
          <PaymentProvider
            trigger={trigger}
            setProcessing={setProcessing}
            booking={booking}
            nights={nights}
            price={price}
          />
        </div>
        {processing ? <div className={styles.button} >
          <CircularProgress className={styles.progress}/> 
          </div>
          :<input className={styles.button} type="submit" value= "Available - Book Now!" />
           
        }
      </form>
    </div>
  );
}

export default Booking;
