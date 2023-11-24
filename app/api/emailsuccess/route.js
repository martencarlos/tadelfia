
import { NextResponse } from "next/server";
import { sendBookingSuccess } from "@/lib/emailService";


export const POST = async ( req ) => {
    const data = await req.json();

    console.log("API - sending email to customer")
    // console.log(data)
    
    await sendBookingSuccess(
        data.contact.email,
        "Tadelfia - Booking Confirmation", //subject
        JSON.stringify(data)//content
      );

    return new NextResponse(JSON.stringify({ message: "received" }), { status: 200 });
}