"use client";
import React from "react";

import getStripe from "@/lib/getStripe";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "../checkout/checkout";

const stripePromise = getStripe();

function PaymentProvider({trigger}) {
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
          <Checkout
            trigger={trigger}
          />
        </Elements>
      )}
    </div>
  );
}

export default PaymentProvider;
