import { NextResponse } from "next/server";

// This is your test secret API key.
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);


const calculateOrderAmount = (booking) => {

  let price = 100;
  if (booking) {
    price = booking.accomodation.price;
  }
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return price;
};

export const POST = async (req) => {
  
  const booking  = await req.json();
  // console.log(booking)
  

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(booking),
    currency: "eur",
    metadata: {
      order_id: '6735' //example of metadata that we can add to the payment intent
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });
 
  return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });

};