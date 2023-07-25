"use client";

import getStripe from "@/lib/getStripe";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "../checkout/checkout";
import { useEffect, useState } from "react";

const stripePromise = getStripe();
let updated = false;

function PaymentProvider({trigger, booking, price, paymentIntentSecret, setProcessing}) {
  const [clientSecret, setClientSecret] = useState(null);

  const [componentBooking, setComponentBooking] = useState(null);

  useEffect(() => {
    // Create first intent to load payment form once
    // Update PaymentIntent when booking changes.
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({cancel: false, booking: booking, clientSecret: clientSecret}),
    })
    .then((res) => res.json())
    .then((data) => {
      setComponentBooking(booking)
      if(data.clientSecret !== "updated"){
        setClientSecret(data.clientSecret)
        paymentIntentSecret.current = data.clientSecret;
      }
        
    });

    // return () => {
    //   fetch("/api/create-payment-intent", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({cancel: true, clientSecret: clientSecret}),
    //   })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data)
    //     setClientSecret(null)
    //     setComponentBooking(null)
    //   }
    //   );
    // }

}, [booking]);

  // check if booking has changed. If so, wait for booking useEffect before enforcing checkout trigger
  updated = false;

  if(JSON.stringify(booking) !== JSON.stringify(componentBooking)){
    updated = true;
  }
  
  // standard options for stripe
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
    {/*when booking has updated, only load after updated intent*/}
      {clientSecret && (
        <Elements id="payment-element" options={options} stripe={stripePromise}>
          <Checkout
            trigger={trigger}
            setProcessing={setProcessing}
            updatingIntent={updated}
            price={price}
          />
        </Elements>
      )}
    </div>
  );
}

export default PaymentProvider;
