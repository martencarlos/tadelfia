"use client";

import getStripe from "@/lib/getStripe";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "../checkout/checkout";
import { useEffect, useState } from "react";

const stripePromise = getStripe();

function PaymentProvider({trigger, booking, nights}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    console.log("first render")
  }, []);

  // Create PaymentIntent as soon as the page loads
  useEffect(() => {
    
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.clientSecret)
          setClientSecret(data.clientSecret)
      });

  }, [nights]);

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
      {clientSecret && (
        <Elements key={clientSecret} id="payment-element" options={options} stripe={stripePromise}>
          <Checkout
            trigger={trigger}
          />
        </Elements>
      )}
    </div>
  );
}

export default PaymentProvider;
