"use client";

import styles from "./booking.module.css";
import DateRangePicker from "@/components/dateRangePicker/dateRangePicker";
import TextField from "@mui/material/TextField";
// import TextareaAutosize from "@mui/base/TextareaAutosize";
// import dataJson from "@/app/villas/[id]/data.json";
import "./booking.css";

import { useEffect, useRef, useState } from "react";
import PaymentProvider from "../paymentProvider/paymentProvider";
import GuestPicker from "../guestPicker/guestPicker";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

let errConfig = false
function Booking({ villa, apartmentId }) {
  const [trigger, setTrigger] = useState(0);
  const [rangeDates, setRangeDates] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [nights, setNights] = useState(null);
  const [price, setPrice] = useState(null);
  const [booking, setBooking] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [capacityExceeded, setCapacityExceeded] = useState(false); //true if adults+children > capacity
  const paymentIntentSecret = useRef(null);
  const [tooltip, setTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [minNights, setMinNights] = useState(2);
  const [error, setError] = useState(null);

  // if picked checkin and checkout dates change, update the nights and pricing
  useEffect(() => {
    if (rangeDates) {
      
      if(rangeDates[0] && rangeDates[1]){
        //remove red border from arrivalAndDepartureDates if there was an error
        const arrivalAndDepartureDates = document.getElementById("arrivalAndDepartureDates");
        if (arrivalAndDepartureDates.style.border === "1px solid red" || tooltip || errConfig){
          arrivalAndDepartureDates.style.border = "none";
          setTooltip(false);
          errConfig = false;
        }

        const nightsCalc = Math.ceil(
          (rangeDates[1] - rangeDates[0]) / (1000 * 3600 * 24)
        );

        // Calculate nights and price (Smoobu)
        // fetch to API route to get the price and nights
        fetch("/api/priceAndNights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            villa: villa,
            checkin: rangeDates[0],
            checkout: rangeDates[1],
          }),
        })
          .then((res) => {
            if(res.status !== 200){
              setTooltipText("Internal Server error");
              setTooltip(true);
            }

            return res.json()
          })
          .then((data) => {
            // console.log(data);
            let minNightsCalc= data[0][1].min_length_of_stay;
            console.log("minNightsCalc", minNightsCalc)
          
            let price = 0;
            let cleaningFee = 0;

            if(villa === "Villa"){
              cleaningFee = 150;
              if(adults>18){
                let extraGuests = 7-(25-adults);
                price = 25*extraGuests;
              }
            }else if(villa === "Ermis"){
              cleaningFee = 25
              if(adults>4){
                let extraGuests = 2-(6-adults);
                price = 25*extraGuests;
              }
            }else if(villa === "Astraia" || villa === "Eros"){
              cleaningFee = 25
            }else{
              cleaningFee = 25
              if(adults>2){
                let extraGuests = 2-(4-adults);
                price = 25*extraGuests;
              }
            }
              
           
            
            data.forEach((date,index, arr) => {
              if (date[1].price === null || date[1].min_length_of_stay === null){
                errConfig = true; //missing price or min_length_of_stay configured in smoobu
              }
              if (index !== arr.length - 1) //if not last element
                price = price + date[1].price;
              // if (minNightsCalc < date[1].min_length_of_stay){
              //   minNightsCalc = date[1].min_length_of_stay;
              // }
            })
            setNights(nightsCalc)
            setMinNights(minNightsCalc);
            // console.log("calc nights and price")
            if(errConfig){
              setTooltipText("Missing apartment date configuration, please contact us");
              setTooltip(true);
            }else if(nightsCalc < minNightsCalc){
              setTooltipText(`Minimum stay is ${minNightsCalc} nights`);
              setTooltip(true);
            }else{
              setTooltip(false);
              price= (price + cleaningFee)*0.3; //30% payment now
              setPrice(price)
            }
              
          });
      }

      // Calculate nights and price (Local) OLD
      // const nightsCalc = Math.ceil(
      //   (rangeDates[1] - rangeDates[0]) / (1000 * 3600 * 24)
      // );
      // if (nightsCalc !== nights && nightsCalc > 0) {
      //   setNights(nightsCalc);
      //   setPrice(
      //     dataJson.find((item) => item.villa === villa).pricePerNight *
      //       nightsCalc
      //   );
      // }
    }
  }, [rangeDates, adults, villa]);

  // cancel payment intent useEffect
  useEffect(() => {
    //cancel payment intent - triggered when refreshing or closing the browser tab
    window.addEventListener("unload", (e) => {
      e.preventDefault();
      
      if (paymentIntentSecret.current) {
        fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cancel: true,
            clientSecret: paymentIntentSecret.current,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            paymentIntentSecret.current = null;
          });
      }
      return null;
    });

    // cancel intent - triggered when unmounting booking component.
    // Meaning user has navigated away from booking page but still inside tadelfia website without completing the booking
    return () => {
      // console.log("unmounting booking");
      // console.log(paymentIntentSecret.current);

      if (paymentIntentSecret.current) {
        fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cancel: true,
            clientSecret: paymentIntentSecret.current,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            paymentIntentSecret.current = null;
          });
      }
    };
  }, []);

  // submit form function
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    setProcessing(true);
    // console.log("submitting form");
    // console.log(nights)
    // console.log(minNights)
    
    //check capacity
    if (capacityExceeded) {
      setProcessing(false);
      arrivalAndDepartureDates.scrollIntoView();
      return;
    }

    // check rangeDates
    if (!rangeDates || rangeDates && !rangeDates[0] || rangeDates && !rangeDates[1]) {
      const arrivalAndDepartureDates = document.getElementById(
        "arrivalAndDepartureDates"
      );
      setTooltip(true);
      setTooltipText("Please select arrival and departure dates");
      arrivalAndDepartureDates.style.border = "1px solid red";
      arrivalAndDepartureDates.scrollIntoView();

      setProcessing(false);
      return;
    }else if(errConfig){
      arrivalAndDepartureDates.style.border = "1px solid red";
      arrivalAndDepartureDates.scrollIntoView();
      setProcessing(false);
      return;
    }else if(nights === null || nights < minNights || !price){
      const arrivalAndDepartureDates = document.getElementById(
        "arrivalAndDepartureDates"
      );
      setTooltip(true);
      setTooltipText(`Minimum stay is ${minNights} nights`);
      arrivalAndDepartureDates.style.border = "1px solid red";
      arrivalAndDepartureDates.scrollIntoView();

      setProcessing(false);
      return;
    }

    // check if dates are still available
    // get all bookings for the villa and the dates
    const startDate= new Date(rangeDates[0]).toISOString().split('T')[0]
    const endDate= new Date(rangeDates[1]).toISOString().split('T')[0]
    const res = await fetch("/api/bookings/villarange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apartmentId: apartmentId,
        startDate: startDate,
        endDate: endDate,
      }),
    })
    const data = await res.json();
    if(data.bookings.length !== 0){
      setTooltip(true);
      setTooltipText(`Dates selected are no longer available, please refresh page and try again`);
      arrivalAndDepartureDates.style.border = "1px solid red";
      arrivalAndDepartureDates.scrollIntoView();
      setProcessing(false);
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
        checkin: new Date(rangeDates[0]), //rangeDates[0].format("DD.MM.YYYY"),
        checkout: new Date(rangeDates[1]),
        nights: nights,
        price: price ? price : 0,
        guests: adults+children,
        adults: adults,
        children: children,
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
          <Tooltip open={tooltip}  title={tooltipText} arrow placement="top" TransitionComponent={Zoom} 
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: '#b92f2f',
                  '& .MuiTooltip-arrow': {
                    color: '#b92f2f',
                  },
                },
              },
            }}
          >
          <div
            className={styles.arrivalAndDepartureDates}
            id="arrivalAndDepartureDates"
          >
            <DateRangePicker
              rangeDates={rangeDates}
              villa={villa}
              setRangeDates={setRangeDates}
            />
          </div>
          </Tooltip>
          {/*Guests*/}
          <GuestPicker 
            setAdults={setAdults}
            setChildren={setChildren} 
            setCapacityExceeded={setCapacityExceeded}
            villa={villa} 
          />

          {/*Comment to host*/}
          <textarea
            style={{
              minHeight: "100px",
              fontSize: "16px",
              padding: "8.5px 14px",
              width: "100%",
            }}
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
            <TextField
              className={styles.input}
              label="First Name"
              id="firstName"
              required
              size="small"
            />
            {/* lastname*/}
            <TextField
              className={styles.input}
              label="Last Name"
              id="lastName"
              required
              size="small"
            />
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
          <h4 className={styles.h2}>Address</h4>
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
            paymentIntentSecret={paymentIntentSecret}
            setProcessing={setProcessing}
            booking={booking}
            nights={nights}
            price={price}
          />
        </div>

        {/* Terms & conditions */}

        <div className={styles.termsContainer}>
          <Checkbox color="success" required />
          <p className={styles.terms}>
            * I agree to the{" "}
            <Link className={styles.termsLink} href={"/policy"}>
              Terms & Conditions
            </Link>
          </p>
        </div>

        {/* Submit button */}
        {processing ? (
          <div className={styles.button}>
            <div className={styles.buttonText}>Processing payment</div>
            <CircularProgress size={25} className={styles.progress} />
          </div>
        ) : (
          <input
            className={styles.button}
            type="submit"
            value="Available - Book Now!"
          />
        )}
      </form>
    </div>
  );
}

export default Booking;
