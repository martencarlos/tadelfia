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


function Booking({ villa }) {
  const [trigger, setTrigger] = useState(0);
  const [rangeDates, setRangeDates] = useState(null);
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(null);
  const [price, setPrice] = useState(null);
  const [booking, setBooking] = useState(null);
  const [processing, setProcessing] = useState(false);
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
        if (arrivalAndDepartureDates.style.border === "1px solid red"){
          arrivalAndDepartureDates.style.border = "none";
          setTooltip(false);
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
            let minNightsCalc= 2;
            let price = 0;
            data.forEach((date,index, arr) => {
              if (index !== arr.length - 1) //if not last element
                price = price + date[1].price;
              if (minNightsCalc < date[1].min_length_of_stay){
                minNightsCalc = date[1].min_length_of_stay;
              }
            })
            setNights(nightsCalc)
            setMinNights(minNightsCalc);
            // console.log("calc nights and price")
            // console.log(price)
            // console.log(minNightsCalc);
            // console.log(nightsCalc)
              if(nightsCalc < minNightsCalc){
                setTooltipText(`Minimum stay is ${minNightsCalc} nights`);
                setTooltip(true);
              }else{
                setTooltip(false);
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
  }, [rangeDates, villa]);

  // cancel payment intent useEffect
  useEffect(() => {
    //cancel payment intent - triggered when refreshing or closing the browser tab
    window.addEventListener("beforeunload", (e) => {
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
    //check rangeDates
    if (!rangeDates || rangeDates && !rangeDates[0] || rangeDates && !rangeDates[1]) {
      const arrivalAndDepartureDates = document.getElementById(
        "arrivalAndDepartureDates"
      );
      setTooltip(true);
      setTooltipText("Please select arrival and departure dates");
      arrivalAndDepartureDates.style.border = "1px solid red";
      arrivalAndDepartureDates.scrollIntoView();

      // alert("Please select arrival and departure dates");
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
          <GuestPicker setGuests={setGuests} />

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
