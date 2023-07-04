import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";

//force dynamic call to api instead of only at build time no matter what you put in the fetch as parameter
export const dynamic = 'force-dynamic' 
// export const revalidate = 10 

export const GET = async (req) => {
    console.log("api/bookings called")

    await dbConnect();
    const allBookings = await Booking.find({});

    return new NextResponse(JSON.stringify(allBookings), { status: 200 });
}