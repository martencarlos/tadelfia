
import styles from "./page.module.css";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Image from "next/image";
import villasJson from "/app/villas/[id]/data.json";

let id = 0;

// Static metadata
export const metadata = {
  title: "Booking Successful", description: "The booking was successfully processed" 
}

async function saveBooking(booking, data) {

  if(id !== 0) return

  //add payment info to the booking
  booking.payment = {
    id: data.id,
    amount: data.amount/100,
    currency: data.currency,
  };

  const res = await fetch(
    "https://login.smoobu.com/api/reservations?pageSize=100",
    {
      method: "POST",
      headers: {
        "Api-Key": process.env.NEXT_PUBLIC_SMOOBU_API_KEY,
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arrivalDate: booking.accomodation.checkin,
        departureDate: booking.accomodation.checkout,
        channelId: 70,
        apartmentId: villasJson.find(
          (item) => item.villa === booking.accomodation.villa
        ).apartmentId,
        arrivalTime: "12:00",
        departureTime: "15:00",
        firstName: booking.contact.firstName,
        lastName: booking.contact.lastName,
        email: booking.contact.email,
        phone: booking.contact.phone,
        notice: booking.accomodation.messageToHost,
        adults: booking.accomodation.adults,
        children: booking.accomodation.children,
        price: booking.accomodation.price/0.3,
        prepayment: booking.accomodation.price,
        priceStatus: 1,
      }),
    }
  );
  const fetchResultMessage = await res.json();
  id = fetchResultMessage.id;
  console.log(fetchResultMessage);

  // SAVE BOOKING TO MONGODB
    await dbConnect();
  //check if booking already exists
  const existingBooking = await Booking.findOne({ "payment.id": data.id });

  if (!existingBooking) {
    // //add payment info to the booking
    // booking.payment = {
    //   id: data.id,
    //   amount: data.amount,
    //   currency: data.currency,
    // };
    //save booking to db
    const newBooking = new Booking(booking);
    await newBooking.save();
  }

  booking.id = id

  //send email to customer
  console.log("email info to be sent to customer:")
  console.log(booking)
  const result = await fetch(process.env.NEXT_PUBLIC_HOST+"/api/emailsuccess", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  })

  if (result && result.status === 200) {
    console.log("email sent to merchant");
    return true;
  } else {
    console.log("Something went wrong! email not sent to merchant");
    return false;
  }
  
}

// async function saveBooking(booking, data) {
//   await dbConnect();
//   //check if booking already exists
//   const existingBooking = await Booking.findOne({ "payment.id": data.id });

//   if (!existingBooking) {
//     //add payment info to the booking
//     booking.payment = {
//       id: data.id,
//       amount: data.amount,
//       currency: data.currency,
//     };
//     //save booking to db
//     const newBooking = new Booking(booking);
//     await newBooking.save();

//     console.log("pre->sending email to merchant")

//     //send email to customer
//     fetch(process.env.NEXT_PUBLIC_HOST+"/api/emailsuccess", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(booking),
//     })
//       .then((res) =>  {
//         if (res.status === 200) {
//           console.log("email sent to merchant")
//           return true
//         }else{
//         console.log("Something went wrong! email not sent to merchant")
//         return false}
//       });
//   }
// }

async function Success({ searchParams, params }) {
  //get payment intent booking info
  const res = await fetch(
    "https://api.stripe.com/v1/payment_intents/" + searchParams.payment_intent,
    {
      method: "GET",
      headers: {
        authorization: "Bearer " + process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
      },
    }
  );
  const data = await res.json();

  const booking = JSON.parse(data.metadata.booking);

  if (booking) await saveBooking(booking, data);


  return (
    booking ? (
      <div className={styles.success}>
        <div className={styles.header}>
          <Image
            src="/booking/success/checkmark.webp"
            alt="Booking Success"
            width={70}
            priority
            height={70}
          />
          <h1>Booking confirmed !</h1>
          <p>Thank you for your booking.</p>
        </div>
        <br />
        <div className={styles.bookingInfo}>
          <br />

          <div className={styles.apartment}>
            <div className={styles.apartmentImage}>
              <Image
                src={
                  "/maingallery/" +
                  villasJson.find(
                    (item) => item.villa === booking.accomodation.villa
                  ).img +
                  ".webp"
                }
                alt="apartment"
                fill
                priority
                className={styles.img}
              />
            </div>
            <div className={styles.apartmentInfo}>
              <div className={styles.title}>
                <h3>{booking.accomodation.villa + " apartment"}</h3>
              </div>
              <div className={styles.subTitle}>
                <p>
                  {
                    villasJson.find(
                      (item) => item.villa === booking.accomodation.villa
                    ).subTitle
                  }
                </p>
              </div>
              <div className={styles.amenities}>
                <div className={styles.amenity}>
                  <div className={styles.amenityTitle}>
                    <h4>Booking Ref.</h4>
                  </div>
                  <div className={styles.amenityContent}>
                 <p>{id}</p> 
                    {/*<p>{"# " + data.id.slice(-6)}</p>*/}
                  </div>
                </div>
                <div className={styles.amenity}>
                  <div className={styles.amenityTitle}>
                    <h4>Check-in</h4>
                  </div>
                  <div className={styles.amenityContent}>
                    <p>
                      {new Date(
                        booking.accomodation.checkin
                      ).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                <div className={styles.amenity}>
                  <div className={styles.amenityTitle}>
                    <h4>Checkout</h4>
                  </div>
                  <div className={styles.amenityContent}>
                    <p>
                      {new Date(
                        booking.accomodation.checkout
                      ).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                <div className={styles.amenity}>
                  <div className={styles.amenityTitle}>
                    <h4>Nights</h4>
                  </div>
                  <div className={styles.amenityContent}>
                    <p>{booking.accomodation.nights}</p>
                  </div>
                </div>
                <div className={styles.amenity}>
                  <div className={styles.amenityTitle}>
                    <h4>Guests</h4>
                  </div>
                  <div className={styles.amenityContent}>
                    <p>{booking.accomodation.adults + " adults"}</p>
                    <p>{booking.accomodation.children + " children"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.apartmentButtonSection}>
              <div className={styles.priceWrapper}>
                <p className={styles.priceLabel}>
                  {booking.accomodation.nights}
                  {" night(s)"}
                </p>
                <h4> {"€ " + booking.accomodation.price/0.3}</h4>
              </div>
            </div>
          </div>
          <br />

          <div className={styles.AdditionalInfo}>
            <h3>Booked by</h3>
            <div className={styles.bookkedby}>
              <p>
                <b>{"Full Name: "}</b>
                {booking.contact.firstName + " " + booking.contact.lastName}
              </p>
              <p>
                <b>{"Email: "}</b>
                {booking.contact.email}
              </p>
              <p>
                <b>{"Phone "}</b>
                {booking.contact.phone}
              </p>
            </div>
          </div>

          <br />
        </div>
        {/* <div className={styles.paymentContainer}>
        <h1>Payment full Details </h1>
        <pre className={styles.json}>{JSON.stringify(data, null, 2) }</pre> 
      </div>
      */}
      </div>)
      :
      <div className={styles.success}>
        Processing your booking...
      </div>
    
  );
}

export default Success;
