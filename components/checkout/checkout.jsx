"use client"
import { useEffect, useState } from "react";
import styles from "./checkout.module.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function Checkout({ trigger, updatingIntent, price, setProcessing}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (trigger && !updatingIntent) {
      handleSubmit();
    }
  }, [trigger,updatingIntent]);

  {/* show a message when the payment has been completed */}
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecretParams = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecretParams) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecretParams).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async () => {
    setMessage(null);
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setProcessing(false);
      return;
    }
    setIsLoading(true);
    

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_HOST}/booking/success`,
      },
    });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
    setProcessing(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div id="payment-form">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <br />
      
      {/* Show any error or success messages */}
      {message && <div className={styles.paymentMessage} id="payment-message">{message}</div>}

      {/* Processing payment message 
      {(isLoading || !stripe || !elements) ? 
        <div className={styles.paymentMessage}>{ "Processing payment..."}</div>
        : ""}*/}
      {/* Show price info when dates are selected */}
      {!isNaN(price) &&
        price !== null &&
        price !== 0 &&
        <div className={styles.price}>{"Total payment: "+ price + "€"}</div>}
    </div>
  );
}
