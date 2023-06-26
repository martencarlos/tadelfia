"use client";
import React from "react";
import Booking from "@/components/booking/booking";

import getStripe from "@/lib/getStripe";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = getStripe();

function PaymentProvider() {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
    });

  }, []);

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
        <Elements options={options} stripe={stripePromise}>
          <Booking />
        </Elements>
      )}
    </div>
  );
}

export default PaymentProvider;
