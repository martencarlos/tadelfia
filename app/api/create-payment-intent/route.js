import { NextResponse } from "next/server";

// This is your test secret API key.
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);


// Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
const calculateOrderAmount = (booking) => {

  let price = 100;
  if (booking) {
    price = booking.accomodation.price*100
  }
  
  return price;
};

export const POST = async (req) => {
  console.log("api/create-payment-intent called")
  const {cancel, booking, clientSecret}  = await req.json();
  console.log("cancel: ", cancel)
  // cancel if booking component is unmounted
  if(cancel && clientSecret){
    
    //check if payment intent is succeeded
    // let paymentIntent = stripe.paymentIntents.retrieve(
    //   clientSecret.substring(0, clientSecret.indexOf("_secret_"))
    // );
    // console.log("paymentIntent status: ", paymentIntent.status)

    //if not then cancel payment intent
    // if(paymentIntent.status === "succeeded")
    await stripe.paymentIntents.cancel(
      clientSecret.substring(0, clientSecret.indexOf("_secret_")))
    
    return new NextResponse(JSON.stringify({ clientSecret: "cancelled" }), { status: 200 });

  }else if(!clientSecret){
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