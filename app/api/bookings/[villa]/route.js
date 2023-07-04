import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";

export const GET = async (request,{params}) => {
    console.log("api/bookings/[villa] called")

    const { villa } = params;
    
    await dbConnect();
    const villaBookings = await Booking.find({ "accomodation.villa": villa});

    return new NextResponse(JSON.stringify(villaBookings), { status: 200 });
}