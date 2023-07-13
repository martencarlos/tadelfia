import { NextResponse } from "next/server";

// This is your test secret API key.
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);


// Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
const calculateOrderAmount = (booking) => {

  let price = 50;
  if (booking) {
    price = booking.accomodation.price;
  }
  
  return price;
};

export const POST = async (req) => {
  
  const {booking,clientSecret}  = await req.json();
  if(!clientSecret){
    // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(booking),
    currency: "eur",
    metadata: {
      booking: JSON.stringify(booking)
    },
    automatic_payment_methods: {
      enabled: true,
    },
  })
  return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });
  // update payment intent metadata
  } else if(clientSecret){
  
     await stripe.paymentIntents.update(
      clientSecret.substring(0, clientSecret.indexOf("_secret_")),
      {
        amount: calculateOrderAmount(booking),
        metadata: {
          booking: JSON.stringify(booking)
        },
      }
    );
    return new NextResponse(JSON.stringify({ clientSecret: "updated" }), { status: 200 });
  }
 
  

};